// components/admin/data/manage-category/CategoryStatusBadges.tsx

import { CategoryStatus, CategoryStatusMap } from '@/defines/category.enum'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

interface CategoryStatusBadgeProps {
  status?: number
}

export function CategoryStatusBadge({ status }: CategoryStatusBadgeProps) {
  const { t } = useTranslation('category')

  if (status === undefined || status === null) return <span>-</span>

  const statusKey = CategoryStatusMap[status]

  const colorMap: Record<CategoryStatus, string> = {
    ACTIVE: 'bg-green-300/30 text-green-600',
    INACTIVE: 'bg-red-300/30 text-red-600'
  }

  if (!statusKey) return <span>-</span>

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-sm font-medium w-fit',
        colorMap[statusKey]
      )}
    >
      {t(`filters.status.${statusKey}`)}
    </span>
  )
}
