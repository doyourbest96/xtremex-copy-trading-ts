'use client'

import { AccountFormModal } from '@/components/accounts/AccountFormModal'
import { AccountListItem } from '@/components/accounts/AccountListItem'
import { ConfirmationModal } from '@/components/accounts/ConfirmationModal'
import { DeleteAccountModal } from '@/components/accounts/DeleteAccountModal'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/contexts/auth-context'
import { apiClient } from '@/lib/apiClient'
import { cn } from '@/lib/utils'
import { Account, AccountStatus, ExchangeName, getExchangeDisplayName } from '@/types/accounts'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null)
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [pendingStatusChange, setPendingStatusChange] = useState<{ account: Account; checked: boolean } | null>(null)

  const [formData, setFormData] = useState({
    exchange: ExchangeName.BINANCE,
    apiKey: '',
    secretKey: '',
    status: AccountStatus.INACTIVE,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Get available exchanges (ones that user hasn't added yet)
  const getAvailableExchanges = () => {
    const usedExchanges = accounts.map((account) => account.exchange)
    return Object.values(ExchangeName).filter((exchange) => !usedExchanges.includes(exchange))
  }

  useEffect(() => {
    if (!user) return
    fetchAccounts()
  }, [user])

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get(`/accounts/user/${user?.id}`)
      console.log('Fetched accounts:', response.data)
      setAccounts(response.data)
    } catch (err: any) {
      console.error('Failed to fetch accounts:', err)
      setError('Failed to load accounts. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenFormModal = (account?: Account) => {
    if (account) {
      setFormData({
        exchange: account.exchange,
        apiKey: account.apiKey,
        secretKey: '', // Don't show the secret for security reasons
        status: account.status,
      })
      setCurrentAccount(account)
      setIsEditing(true)
    } else {
      const availableExchanges = getAvailableExchanges()
      if (availableExchanges.length === 0) {
        alert('You have already added all available exchanges.')
        return
      }

      setFormData({
        exchange: availableExchanges[0], // Default to first available exchange
        apiKey: '',
        secretKey: '',
        status: AccountStatus.INACTIVE, // Default to inactive for new accounts
      })
      setCurrentAccount(null)
      setIsEditing(false)
    }
    setIsFormModalOpen(true)
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false)
    setCurrentAccount(null)
  }

  const handleOpenDeleteModal = (id: string) => {
    const account = accounts.find((acc) => acc.id === id)
    if (account) {
      setAccountToDelete(account)
      setIsDeleteModalOpen(true)
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setAccountToDelete(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleStatusChange = (checked: boolean) => {
    const newStatus = checked ? AccountStatus.ACTIVE : AccountStatus.INACTIVE
    setFormData((prev) => ({
      ...prev,
      status: newStatus,
    }))
  }

  
const handleToggleStatus = async (account: Account, checked: boolean) => {
  const newStatus = checked ? AccountStatus.ACTIVE : AccountStatus.INACTIVE;

  // If setting to active, first check if there's already an active account
  if (newStatus === AccountStatus.ACTIVE) {
    const hasActiveAccount = accounts.some(
      (acc) => acc.status === AccountStatus.ACTIVE && acc.id !== account.id
    );
    
    if (hasActiveAccount) {
      // Store the pending change and show confirmation modal
      setPendingStatusChange({ account, checked });
      setIsConfirmModalOpen(true);
      return;
    }
  }

  // If no confirmation needed or setting to inactive, proceed with the change
  await updateAccountStatus(account, newStatus);
};

  const handleConfirmStatusChange = async () => {
    if (!pendingStatusChange) return

    const { account, checked } = pendingStatusChange
    const newStatus = checked ? AccountStatus.ACTIVE : AccountStatus.INACTIVE

    await updateAccountStatus(account, newStatus)

    // Reset state
    setIsConfirmModalOpen(false)
    setPendingStatusChange(null)
  }

  const handleCancelStatusChange = () => {
    setIsConfirmModalOpen(false)
    setPendingStatusChange(null)
  }

  // Extract the actual status update logic to a separate function
  const updateAccountStatus = async (account: Account, newStatus: AccountStatus) => {
    try {
      // If setting account to active, deactivate any other active accounts
      let updatedAccounts = [...accounts]

      if (newStatus === AccountStatus.ACTIVE) {
        // Deactivate other accounts in our local state
        updatedAccounts = updatedAccounts.map((acc) =>
          acc.id !== account.id && acc.status === AccountStatus.ACTIVE
            ? { ...acc, status: AccountStatus.INACTIVE }
            : acc
        )

        // Also update on the server
        await Promise.all(
          accounts
            .filter((acc) => acc.id !== account.id && acc.status === AccountStatus.ACTIVE)
            .map((acc) => apiClient.put(`/accounts/${acc.id}`, { status: AccountStatus.INACTIVE }))
        )
      }

      // Update the current account status
      await apiClient.put(`/accounts/${account.id}`, { status: newStatus })

      // Update local state
      updatedAccounts = updatedAccounts.map((acc) => (acc.id === account.id ? { ...acc, status: newStatus } : acc))

      setAccounts(updatedAccounts)
    } catch (err: any) {
      console.error('Error updating account status:', err)
      alert(err.response?.data?.error || 'Failed to update account status. Please try again.')
    }
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // If setting account to active, deactivate any other active accounts
      const isSettingToActive = formData.status === AccountStatus.ACTIVE
      let updatedAccounts = [...accounts]

      if (isEditing && currentAccount) {
        // Update existing account
        const payload = {
          exchange: formData.exchange,
          apiKey: formData.apiKey,
          status: formData.status,
          // Only include secretKey if it was changed (not empty)
          ...(formData.secretKey ? { secretKey: formData.secretKey } : {}),
        }

        // If setting to active and current account is not already active
        if (isSettingToActive && currentAccount.status !== AccountStatus.ACTIVE) {
          // Deactivate other accounts in our local state
          updatedAccounts = updatedAccounts.map((acc) =>
            acc.id !== currentAccount.id && acc.status === AccountStatus.ACTIVE
              ? { ...acc, status: AccountStatus.INACTIVE }
              : acc
          )

          // Also update on the server
          await Promise.all(
            accounts
              .filter((acc) => acc.id !== currentAccount.id && acc.status === AccountStatus.ACTIVE)
              .map((acc) => apiClient.put(`/accounts/${acc.id}`, { status: AccountStatus.INACTIVE }))
          )
        }

        const response = await apiClient.put(`/accounts/${currentAccount.id}`, payload)

        updatedAccounts = updatedAccounts.map((acc) =>
          acc.id === currentAccount.id
            ? {
                ...acc,
                exchange: formData.exchange as ExchangeName,
                apiKey: formData.apiKey,
                status: formData.status,
              }
            : acc
        )
      } else {
        // Check if user already has this exchange
        if (accounts.some((acc) => acc.exchange === formData.exchange)) {
          alert(`You already have a ${getExchangeDisplayName(formData.exchange)} account connected.`)
          return
        }

        // If setting new account to active, deactivate other accounts
        if (isSettingToActive) {
          // Deactivate other accounts in our local state
          updatedAccounts = updatedAccounts.map((acc) =>
            acc.status === AccountStatus.ACTIVE ? { ...acc, status: AccountStatus.INACTIVE } : acc
          )

          // Also update on the server
          await Promise.all(
            accounts
              .filter((acc) => acc.status === AccountStatus.ACTIVE)
              .map((acc) => apiClient.put(`/accounts/${acc.id}`, { status: AccountStatus.INACTIVE }))
          )
        }

        const newAccount = {
          userId: user?.id,
          accountType: 'follower',
          ...formData,
        }
        console.log('New account:', newAccount)
        // Add new account
        const response = await apiClient.post('/accounts', newAccount)
        updatedAccounts = [...updatedAccounts, response.data]
      }

      setAccounts(updatedAccounts)
      handleCloseFormModal()
    } catch (err: any) {
      console.error('Error saving account:', err)
      alert(err.response?.data?.error || 'Failed to save account. Please try again.')
    }
  }

  const handleDeleteAccount = async () => {
    if (!accountToDelete) return

    try {
      await apiClient.delete(`/accounts/${accountToDelete.id}`)
      setAccounts(accounts.filter((acc) => acc.id !== accountToDelete.id))
      handleCloseDeleteModal()
    } catch (err: any) {
      console.error('Error deleting account:', err)
      alert(err.response?.data?.error || 'Failed to delete account. Please try again.')
    }
  }

  const availableExchanges = getAvailableExchanges()

  return (
    <div className="mx-auto max-w-4xl">
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Heading>Your Exchange Accounts</Heading>
          <Text>Connect your exchange accounts to enable copy trading.</Text>
        </div>
        <div className="flex items-center justify-end">
          <Button
            onClick={() => handleOpenFormModal()}
            disabled={availableExchanges.length === 0}
            className={cn('h-10 items-center', availableExchanges.length === 0 && 'cursor-not-allowed opacity-50')}
          >
            <PlusIcon className="mr-2 h-5 w-5" />
            Add Exchange
          </Button>
        </div>
      </section>
      <Divider className="my-10" soft />

      {isLoading ? (
        <div className="py-12 text-center">
          <Text>Loading accounts...</Text>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 py-12 text-center dark:bg-red-900/30">
          <Text className="text-red-700 dark:text-red-200">{error}</Text>
          <Button onClick={fetchAccounts} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {accounts.length === 0 ? (
            <div className="rounded-lg bg-zinc-50 py-12 text-center dark:bg-zinc-800/50">
              <Text className="text-zinc-500 dark:text-zinc-400">You havent added any exchange accounts yet.</Text>
              <Button onClick={() => handleOpenFormModal()} className="mt-4">
                Add Your First Exchange
              </Button>
            </div>
          ) : (
            accounts.map((account, index) => (
              <AccountListItem
                key={account.id}
                account={account}
                index={index}
                totalAccounts={accounts.length}
                onEdit={handleOpenFormModal}
                onDelete={handleOpenDeleteModal}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </>
      )}

      {/* Form Modal */}
      <AccountFormModal
        isOpen={isFormModalOpen}
        isEditing={isEditing}
        formData={formData}
        currentAccount={currentAccount}
        accounts={accounts}
        availableExchanges={availableExchanges}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitForm}
        onInputChange={handleInputChange}
        onStatusChange={handleStatusChange}
      />

      {/* Confirmation Modal for Active Account Change */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Change Active Account"
        message="You already have an active account. Setting this account to active will deactivate your current active account."
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelStatusChange}
      />

      {/* Delete Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        account={accountToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    </div>
  )
}
