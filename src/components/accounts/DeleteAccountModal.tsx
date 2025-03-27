import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Account, getExchangeDisplayName } from '@/types/accounts'

interface DeleteAccountModalProps {
  isOpen: boolean
  account: Account | null
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function DeleteAccountModal({ isOpen, account, onClose, onConfirm }: DeleteAccountModalProps) {
  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-800">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mt-4 text-xl font-bold">Delete Account</h2>
          <Text className="mt-2 text-center">
            Are you sure you want to delete your {getExchangeDisplayName(account.exchange)} account? This action cannot be undone.
          </Text>
          
          <div className="mt-4 w-full rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Exchange:</span>
              <span className="font-medium">{getExchangeDisplayName(account.exchange)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium">API Key:</span>
              <span className="font-mono text-sm">
                {account.apiKey.substring(0, 6)}...{account.apiKey.substring(account.apiKey.length - 4)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 flex w-full justify-end gap-4">
            <Button type="button" onClick={onClose} plain>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
