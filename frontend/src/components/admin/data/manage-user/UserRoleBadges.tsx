import { Crown, PencilLine, User2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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

interface UserRoleBadgesProps {
  roles?: string[]
}

export function UserRoleBadges({ roles }: UserRoleBadgesProps) {
  if (!roles || roles.length === 0) return <span>-</span>

  return (
    <div className='flex flex-wrap gap-1'>
      {roles.map((role) => {
        const config = roleConfig[role as keyof typeof roleConfig]
        if (!config) return null

        return (
          <div
            key={role}
            className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-medium',
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
