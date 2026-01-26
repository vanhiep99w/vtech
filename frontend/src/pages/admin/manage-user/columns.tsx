'use client'

import { DataTableColumnHeader } from '@/components/admin/datatable/DataTableColumnHeader'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { type ColumnDef } from '@tanstack/react-table'
import { Crown, Edit, Eye, PencilLine, Trash2, User2 } from 'lucide-react'

export type User = {
  id: string
  username: string
  email: string
  fullName: string
  phone: string
  avt: string
  role: 'ADMIN' | 'USER' | 'STAFF'
  status: 'ACTIVE' | 'INACTIVE'
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='User' />,
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex items-center gap-3'>
          <img
            src={user.avt}
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Full name' />
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Phone' />
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
    cell: ({ row }) => {
      const role = row.getValue('role') as string

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

      const config = roleConfig[role as keyof typeof roleConfig]

      return (
        <div
          className={cn(
            'flex items-center gap-2 px-2 py-1 rounded-md w-max text-sm font-medium',
            config.className
          )}
        >
          {config.icon}
          {config.label}
        </div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    filterFn: (row, columnId, filterValue) => {
      return row.getValue(columnId) === filterValue
    },
    cell: ({ row }) => {
      const status = row.getValue('status')

      return (
        <span
          className={cn(
            'px-2 py-1 rounded-md text-sm font-medium',
            status === 'ACTIVE' && 'bg-green-300/30 text-green-600',
            status === 'INACTIVE' && 'bg-red-300/30 text-red-600'
          )}
        >
          {status as string}
        </span>
      )
    }
  },
  {
    id: 'actions',
    header: () => <div className='text-center'>Actions</div>,
    cell: () => {
      return (
        <div className='flex items-center justify-center gap-2'>
          <Button
            variant='ghost'
            size='default'
            className='h-8 px-2.5 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20 '
            onClick={() => {
              // TODO: Thêm logic view
            }}
          >
            <Eye className='h-4 w-4 mr-1.5' />
          </Button>
          <Button
            variant='ghost'
            size='default'
            className='h-8 px-2.5 hover:bg-yellow-100 hover:text-orange-700 dark:hover:bg-yellow-100/20'
            onClick={() => {
              // TODO: Thêm logic delete
            }}
          >
            <Edit className='h-4 w-4 mr-1.5' />
          </Button>
          <Button
            variant='ghost'
            size='default'
            className='h-8 px-2.5 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20'
            onClick={() => {
              // TODO: Thêm logic delete
            }}
          >
            <Trash2 className='h-4 w-4 mr-1.5' />
          </Button>
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false
  }
]
