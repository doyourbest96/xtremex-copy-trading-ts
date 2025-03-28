'use client'

import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { useAuth } from '@/contexts/auth-context'
import { ArrowPathIcon, CreditCardIcon } from '@heroicons/react/20/solid'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

// Define subscription types
interface Subscription {
  id: string
  plan: string
  status: 'active' | 'inactive' | 'canceled' | 'expired'
  startDate: string
  endDate: string
  price: number
  features: string[]
  autoRenew: boolean
}

// Define wallet transaction types
interface Transaction {
  id: string
  date: string
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund'
  amount: number
  status: 'completed' | 'pending' | 'failed'
  description: string
}

// Define wallet type
interface Wallet {
  balance: number
  currency: string
  transactions: Transaction[]
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    fetchSubscriptionData()
  }, [user])

  const fetchSubscriptionData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // In a real app, you would fetch this data from your API
      // For now, we'll use mock data

      // Mock subscription data
      const mockSubscription: Subscription = {
        id: 'sub_123456',
        plan: 'Pro',
        status: 'active',
        startDate: '2023-01-01',
        endDate: '2024-01-01',
        price: 49.99,
        features: ['Copy trading', 'Advanced analytics', 'Priority support', 'API access', 'Custom strategies'],
        autoRenew: true,
      }

      // Mock wallet data
      const mockWallet: Wallet = {
        balance: 1250.75,
        currency: 'USD',
        transactions: [
          {
            id: 'tx_1',
            date: '2023-12-15',
            type: 'deposit',
            amount: 500,
            status: 'completed',
            description: 'Deposit via credit card',
          },
          {
            id: 'tx_2',
            date: '2023-12-01',
            type: 'payment',
            amount: -49.99,
            status: 'completed',
            description: 'Monthly subscription payment',
          },
          {
            id: 'tx_3',
            date: '2023-11-01',
            type: 'payment',
            amount: -49.99,
            status: 'completed',
            description: 'Monthly subscription payment',
          },
          {
            id: 'tx_4',
            date: '2023-10-15',
            type: 'deposit',
            amount: 1000,
            status: 'completed',
            description: 'Deposit via bank transfer',
          },
        ],
      }

      // In a real app, you would fetch this data from your API:
      // const subscriptionResponse = await apiClient.get(`/subscriptions/user/${user?.id}`)
      // const walletResponse = await apiClient.get(`/wallet/user/${user?.id}`)

      setSubscription(mockSubscription)
      setWallet(mockWallet)
    } catch (err: any) {
      console.error('Failed to fetch subscription data:', err)
      setError('Failed to load subscription data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: wallet?.currency || 'USD',
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'inactive':
      case 'expired':
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowPathIcon className="h-5 w-5 text-green-500" />
      case 'withdrawal':
        return <ArrowPathIcon className="h-5 w-5 rotate-180 transform text-red-500" />
      case 'payment':
        return <CreditCardIcon className="h-5 w-5 text-blue-500" />
      case 'refund':
        return <ArrowPathIcon className="h-5 w-5 rotate-180 transform text-green-500" />
      default:
        return <CreditCardIcon className="h-5 w-5" />
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Heading>Subscription & Wallet</Heading>
      <Divider className="my-10 mt-6" />

      {isLoading ? (
        <div className="py-12 text-center">
          <Text>Loading subscription data...</Text>
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 py-12 text-center dark:bg-red-900/30">
          <Text className="text-red-700 dark:text-red-200">{error}</Text>
          <Button onClick={fetchSubscriptionData} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {/* Current Subscription Section */}
          <section>
            <Heading>Current Subscription</Heading>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center">
                    <Text className="text-xl font-bold">{subscription?.plan} Plan</Text>
                    <span
                      className={`ml-3 rounded-full px-2 py-1 text-xs ${getStatusColor(subscription?.status || '')}`}
                    >
                      {subscription && subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>
                  <Text className="mt-1 text-zinc-500">{formatCurrency(subscription?.price || 0)} per month</Text>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button>Upgrade Plan</Button>
                </div>
              </div>

              <Divider className="my-4" soft />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Text className="font-medium">Billing Period</Text>
                  <Text className="text-zinc-500">
                    {formatDate(subscription?.startDate || '')} - {formatDate(subscription?.endDate || '')}
                  </Text>
                </div>
                <div>
                  <Text className="font-medium">Auto Renewal</Text>
                  <div className="flex items-center">
                    <span
                      className={`mr-2 inline-block h-2 w-2 rounded-full ${subscription?.autoRenew ? 'bg-green-500' : 'bg-red-500'}`}
                    ></span>
                    <Text className="text-zinc-500">{subscription?.autoRenew ? 'Enabled' : 'Disabled'}</Text>
                  </div>
                </div>
              </div>

              <Divider className="my-4" soft />

              <div>
                <Text className="font-medium">Features Included</Text>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {subscription?.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                      <Text className="text-zinc-600 dark:text-zinc-300">{feature}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Wallet Section */}
          <section className="mt-10">
            <Heading>Wallet Balance</Heading>
            <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Text className="text-xl font-bold">{formatCurrency(wallet?.balance || 0)}</Text>
                  <Text className="mt-1 text-zinc-500">Available balance</Text>
                </div>
                <div className="mt-4 flex gap-2 sm:mt-0">
                  <Button>Deposit</Button>
                  <Button plain>Withdraw</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Transaction History Section */}
          <section className="mt-10">
            <Heading>Transaction History</Heading>
            <div className="mt-4 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              <table className="w-full border-collapse text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-700 dark:bg-zinc-800">
                  {wallet?.transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-700/50">
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-zinc-900 dark:text-zinc-100">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center">
                          {getTransactionIcon(transaction.type)}
                          <span className="ml-2 capitalize">{transaction.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">{transaction.description}</td>
                      <td
                        className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
                      >
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
