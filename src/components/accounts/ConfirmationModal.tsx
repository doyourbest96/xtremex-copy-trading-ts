import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-800">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
            <ExclamationTriangleIcon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="mt-4 text-xl font-bold">{title}</h2>
          <Text className="mt-2 text-center">{message}</Text>
          
          <div className="mt-6 flex w-full justify-end gap-4">
            <Button type="button" onClick={onCancel} plain>
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={onConfirm}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
