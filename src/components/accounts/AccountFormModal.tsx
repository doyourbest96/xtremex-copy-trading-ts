import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxField } from '@/components/ui/checkbox'
import { Field, Label } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { Account, AccountStatus, ExchangeName, getExchangeDisplayName } from '@/types/accounts'

interface AccountFormData {
  exchange: ExchangeName
  apiKey: string
  secretKey: string
  status: AccountStatus
}

interface AccountFormModalProps {
  isOpen: boolean
  isEditing: boolean
  formData: AccountFormData
  currentAccount: Account | null
  accounts: Account[]
  availableExchanges: ExchangeName[]
  onClose: () => void
  onSubmit: (e: React.FormEvent) => Promise<void>
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onStatusChange: (checked: boolean) => void
}

export function AccountFormModal({
  isOpen,
  isEditing,
  formData,
  currentAccount,
  accounts,
  availableExchanges,
  onClose,
  onSubmit,
  onInputChange,
  onStatusChange,
}: AccountFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-zinc-800">
        <h2 className="mb-4 text-xl font-bold">
          {isEditing
            ? `Edit ${getExchangeDisplayName(currentAccount?.exchange || '')} Account`
            : 'Add New Exchange Account'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Field>
              <Label>Exchange</Label>
            </Field>
            <Select
              name="exchange"
              value={formData.exchange}
              onChange={onInputChange}
              disabled={isEditing} // Can't change exchange when editing
            >
              {isEditing ? (
                <option value={formData.exchange}>{getExchangeDisplayName(formData.exchange)}</option>
              ) : (
                availableExchanges.map((exchange) => (
                  <option key={exchange} value={exchange}>
                    {getExchangeDisplayName(exchange)}
                  </option>
                ))
              )}
            </Select>
          </div>
          <div>
            <Field>
              <Label>API Key</Label>
            </Field>
            <Input
              type="text"
              name="apiKey"
              value={formData.apiKey}
              onChange={onInputChange}
              placeholder="Enter your API key"
              required
            />
          </div>
          <div>
            <Field>
              <Label>API Secret</Label>
            </Field>
            <Input
              type="password"
              name="secretKey"
              value={formData.secretKey}
              onChange={onInputChange}
              placeholder={isEditing ? 'Leave blank to keep current secret' : 'Enter your API secret'}
              {...(!isEditing && { required: true })}
            />
            {isEditing && (
              <Text className="mt-1 text-xs text-zinc-500">Leave blank to keep your current API secret</Text>
            )}
          </div>
          <div>
            <CheckboxField>
              <Checkbox
                name="status"
                checked={formData.status === AccountStatus.ACTIVE}
                onChange={onStatusChange}
              />
              <Label>Set as active account</Label>
            </CheckboxField>
            {formData.status === AccountStatus.ACTIVE &&
              accounts.some(
                (acc) => acc.status === AccountStatus.ACTIVE && (!currentAccount || acc.id !== currentAccount.id)
              ) && (
                <Text className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  This will deactivate your current active account.
                </Text>
              )}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" onClick={onClose} plain>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Update' : 'Add'} Account</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
