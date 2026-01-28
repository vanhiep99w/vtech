import { UserActionsCell } from '@/components/admin/action/UserAction'
import { DataTableColumnHeader } from '@/components/admin/datatable/DataTableColumnHeader'
import { Checkbox } from '@/components/ui/checkbox'
import i18n from '@/i18n/i18n'
import { cn } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { Crown, PencilLine, User2 } from 'lucide-react'

export type User = {
  id: string
  username: string
  email: string
  fullName?: string | null
  phone?: string | null
  avatar?: string | null
  status: number
  roles: string[]
}

export const columns: ColumnDef<User>[] = [
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
    id: 'user',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('user:table.columns.user')} />
    ),
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex items-center gap-3'>
          <img
            src={user.avatar ?? 'https://ui.shadcn.com/avatars/02.png'}
            alt={user.username}
            className='h-9 w-9 rounded-full object-cover border'
          />

          <div className='flex flex-col'>
            <span className='font-medium leading-none'>{user.username}</span>
            <span className='text-sm text-muted-foreground'>{user.email}</span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('user:table.columns.fullName')} />
    )
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('user:table.columns.phone')} />
    )
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('user:table.columns.role')} />
    ),
    filterFn: (row, columnId, filterValue) => {
      const roles = row.getValue(columnId) as string[]

      if (!filterValue) return true
      if (!Array.isArray(roles)) return false

      return roles.includes(filterValue)
    },
    cell: ({ row }) => {
      const roles = row.getValue('roles') as string[]

      const roleConfig = {
        ADMIN: {
          label: 'Admin',
          icon: <Crown className='h-4 w-4' />,
          className: 'bg-blue-100 text-blue-700'
        },
        USER: {
          label: 'User',
          icon: <User2 className='h-4 w-4' />,
          className: 'bg-orange-100 text-orange-700'
        },
        STAFF: {
          label: 'Staff',
          icon: <PencilLine className='h-4 w-4' />,
          className: 'bg-purple-100 text-purple-700'
        }
      } as const

      return (
        <div className='flex flex-wrap gap-1'>
          {roles.map((role) => {
            const config = roleConfig[role as keyof typeof roleConfig]
            if (!config) return null

            return (
              <div
                key={role}
                className={cn(
                  'flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium',
                  config.className
                )}
              >
                {config.icon}
                {config.label}
              </div>
            )
          })}
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={i18n.t('user:table.columns.status')} />
    ),
    filterFn: (row, columnId, filterValue) => {
      const status = row.getValue(columnId) as number

      if (filterValue === 'ACTIVE') return status === 1
      if (filterValue === 'INACTIVE') return status === 0

      return true
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as number

      return (
        <span
          className={cn(
            'px-2 py-1 rounded-md text-sm font-medium',
            status === 1 && 'bg-green-300/30 text-green-600',
            status === 0 && 'bg-red-300/30 text-red-600'
          )}
        >
          {status === 1 ? 'Active' : 'Inactive'}
        </span>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>{i18n.t('user:table.columns.actions')}</div>,
    cell: ({ row }) => <UserActionsCell user={row.original} />,
    enableSorting: false,
    enableHiding: false
  }
]
