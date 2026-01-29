import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface UserStatusBadgeProps {
  status?: number
}

export function UserStatusBadge({ status }: UserStatusBadgeProps) {
  const { t } = useTranslation('user')

  if (status === undefined || status === null) return <span>-</span>

  const isActive = status === 1

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-sm font-medium w-fit',
        isActive ? 'bg-green-300/30 text-green-600' : 'bg-red-300/30 text-red-600'
      )}
    >
      {isActive ? t('status.active', 'Active') : t('status.inactive', 'Inactive')}
    </span>
  )
}
