import { CategoryActionsCell } from '@/components/admin/action/CategoryAction'
import { UserStatusBadge } from '@/components/admin/data/manage-user/UserStatusBadges'
import { DataTableColumnHeader } from '@/components/admin/datatable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui/checkbox'
import i18n from '@/i18n/i18n'
import { type ColumnDef } from '@tanstack/react-table'

export type Category = {
  id: string
  categoryName: string
  slug: string
  categoryDesc?: string | null
  thumbnailUrl?: string | null
  parentId?: string | null
  parentName?: string | null
  displayOrder: number
  status: number
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Category>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: 'category',
    accessorKey: 'categoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('category:table.columns.category')} />
    ),
    cell: ({ row }) => {
      const category = row.original

      return (
        <div className='flex items-center gap-3'>
          <img
            src={category.thumbnailUrl ?? 'https://ui.shadcn.com/avatars/02.png'}
            alt={category.categoryName}
            className='h-9 w-9 rounded-full object-cover border'
          />

          <div className='flex flex-col'>
            <span className='font-medium'>{category.categoryName}</span>
            <span className='text-xs text-muted-foreground'>{category.slug}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'parentId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('category:table.columns.parent')} />
    ),
    cell: ({ row }) => row.original.parentName,
    filterFn: (row, columnId, filterValue: string) => {
      if (!filterValue) return true
      return row.getValue<string | null>(columnId) === filterValue
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('category:table.columns.status')} />
    ),
    cell: ({ row }) => <UserStatusBadge status={row.getValue('status')} />,
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true
      return String(row.getValue<number>(columnId)) === filterValue
    }
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>{i18n.t('category:table.columns.actions')}</div>,
    cell: ({ row }) => <CategoryActionsCell category={row.original} />,
    enableSorting: false,
    enableHiding: false
  }
]
