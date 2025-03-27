import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { Divider } from '@/components/ui/divider'
import { Field, Label } from '@/components/ui/fieldset'
import { Subheading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Account, AccountStatus, getExchangeDisplayName } from '@/types/accounts'

interface AccountListItemProps {
  account: Account
  index: number
  totalAccounts: number
  onEdit: (account: Account) => void
  onDelete: (id: string) => void
  onToggleStatus: (account: Account, checked: boolean) => void
}

export function AccountListItem({
  account,
  index,
  totalAccounts,
  onEdit,
  onDelete,
  onToggleStatus,
}: AccountListItemProps) {
  return (
    <div>
      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <div className="flex items-center">
            <Subheading>{getExchangeDisplayName(account.exchange)}</Subheading>
            <span
              className={cn(
                'ml-3 rounded-full px-2 py-1 text-xs',
                account.status === AccountStatus.ACTIVE
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400'
              )}
            >
              {account.status === AccountStatus.ACTIVE ? 'Active' : 'Inactive'}
            </span>
          </div>
          <Text>Exchange API credentials</Text>
        </div>
        <div className="space-y-4">
          <div>
            <Field>
              <Label>API Key</Label>
            </Field>
            <div className="mt-1 rounded border border-zinc-200 bg-zinc-50 p-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
              {account.apiKey.substring(0, 6)}...{account.apiKey.substring(account.apiKey.length - 4)}
            </div>
          </div>
          <div>
            <Field>
              <Label>API Secret</Label>
            </Field>
            <div className="mt-1 rounded border border-zinc-200 bg-zinc-50 p-2 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
              ••••••••••••••••
            </div>
          </div>
          <div className="flex items-center justify-between">
            <CheckboxField>
              <Checkbox
                checked={account.status === AccountStatus.ACTIVE}
                onChange={(checked) => onToggleStatus(account, checked)}
              />
              <Label>Set as active account</Label>
            </CheckboxField>
            <div className="flex gap-2">
              <Button onClick={() => onEdit(account)} plain>
                <PencilIcon className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                onClick={() => onDelete(account.id)}
                plain
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </section>
      {index < totalAccounts - 1 && <Divider className="my-10" soft />}
    </div>
  )
}
