'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { apiClient } from '@/lib/apiClient'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Text } from '@/components/text'
import { Label } from '@/components/fieldset'

interface Account {
  id: string
  name: string
  apiKey: string
  apiSecret: string
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<Account | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    apiKey: '',
    apiSecret: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get('/accounts')
      setAccounts(response.data)
    } catch (err: any) {
      console.error('Failed to fetch accounts:', err)
      setError('Failed to load accounts. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenModal = (account?: Account) => {
    if (account) {
      setFormData({
        name: account.name,
        apiKey: account.apiKey,
        apiSecret: '', // Don't show the secret for security reasons
      })
      setCurrentAccount(account)
      setIsEditing(true)
    } else {
      setFormData({
        name: '',
        apiKey: '',
        apiSecret: '',
      })
      setCurrentAccount(null)
      setIsEditing(false)
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentAccount(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (isEditing && currentAccount) {
        // Update existing account
        const payload = {
          name: formData.name,
          apiKey: formData.apiKey,
          // Only include apiSecret if it was changed (not empty)
          ...(formData.apiSecret ? { apiSecret: formData.apiSecret } : {})
        }
        
        const response = await apiClient.put(`/accounts/${currentAccount.id}`, payload)
        
        setAccounts(accounts.map(acc => 
          acc.id === currentAccount.id 
            ? { ...acc, name: formData.name, apiKey: formData.apiKey } 
            : acc
        ))
      } else {
        // Add new account (max 3)
        if (accounts.length >= 3) {
          alert('You can only have up to 3 accounts')
          return
        }
        
        const response = await apiClient.post('/accounts', formData)
        setAccounts([...accounts, response.data])
      }
      
      handleCloseModal()
    } catch (err: any) {
      console.error('Error saving account:', err)
      alert(err.response?.data?.error || 'Failed to save account. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      try {
        await apiClient.delete(`/accounts/${id}`)
        setAccounts(accounts.filter(acc => acc.id !== id))
      } catch (err: any) {
        console.error('Error deleting account:', err)
        alert(err.response?.data?.error || 'Failed to delete account. Please try again.')
      }
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Heading>Exchange Accounts</Heading>
      <Divider className="my-10 mt-6" />

      {isLoading ? (
        <div className="text-center py-12">
          <Text>Loading accounts...</Text>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <Text className="text-red-700 dark:text-red-200">{error}</Text>
          <Button onClick={fetchAccounts} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="space-y-1">
              <Subheading>Your Accounts</Subheading>
              <Text>You can connect up to 3 exchange accounts.</Text>
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => handleOpenModal()} 
                disabled={accounts.length >= 3}
                className={cn(accounts.length >= 3 && "opacity-50 cursor-not-allowed")}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Account
              </Button>
            </div>
          </section>

          <Divider className="my-10" soft />

          {accounts.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
              <Text className="text-zinc-500 dark:text-zinc-400">
                You havent added any exchange accounts yet.
              </Text>
              <Button onClick={() => handleOpenModal()} className="mt-4">
                Add Your First Account
              </Button>
            </div>
          ) : (
            accounts.map((account, index) => (
              <div key={account.id}>
                <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Subheading>{account.name}</Subheading>
                    <Text>Exchange API credentials</Text>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>API Key</Label>
                      <div className="font-mono text-sm mt-1 p-2 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
                        {account.apiKey.substring(0, 6)}...{account.apiKey.substring(account.apiKey.length - 4)}
                      </div>
                    </div>
                    <div>
                      <Label>API Secret</Label>
                      <div className="font-mono text-sm mt-1 p-2 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700">
                        ••••••••••••••••
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button onClick={() => handleOpenModal(account)} plain>
                        <PencilIcon className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(account.id)} plain className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </section>
                {index < accounts.length - 1 && <Divider className="my-10" soft />}
              </div>
            ))
          )}
        </>
      )}

      {/* Modal for adding/editing accounts */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Account' : 'Add New Account'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Exchange Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Binance, Bybit, etc."
                  required
                />
              </div>
              <div>
                <Label>API Key</Label>
                <Input
                  type="text"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  placeholder="Enter your API key"
                  required
                />
              </div>
              <div>
                <Label>API Secret</Label>
                <Input
                  type="password"
                  name="apiSecret"
                  value={formData.apiSecret}
                  onChange={handleInputChange}
                  placeholder={isEditing ? "Leave blank to keep current secret" : "Enter your API secret"}
                  {...(!isEditing && { required: true })}
                />
                {isEditing && (
                  <Text className="text-xs text-zinc-500 mt-1">
                    Leave blank to keep your current API secret
                  </Text>
                )}
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <Button type="button" onClick={handleCloseModal} plain>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? 'Update' : 'Add'} Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
