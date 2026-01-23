import Logout from '@/components/auth/Logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth.store'
import { Camera, Mail, Phone } from 'lucide-react'
import { useEffect } from 'react'

export default function ProfileHeader() {
  const { user, loading, fetchMyInfo } = useAuthStore()

  useEffect(() => {
    if (!user) {
      fetchMyInfo()
    }
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <p>Không có dữ liệu user</p>

  return (
    <Card>
      <CardContent className='p-6'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center'>
          <div className='relative shrink-0'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src='/vite.svg' alt='Profile' />
              <AvatarFallback className='text-2xl'>JD</AvatarFallback>
            </Avatar>
            <Button
              size='icon'
              variant='outline'
              className='absolute -right-2 -bottom-2 h-8 w-8 rounded-full'
            >
              <Camera className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex flex-1 flex-col gap-2'>
            <h1 className='text-2xl font-semibold'>{user.username}</h1>

            <div className='flex flex-wrap gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4' />
                <span className='font-semibold'>{user.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4' />
                <span className='font-semibold'>0398681023</span>
              </div>
            </div>
          </div>

          <div className='md:ml-auto'>
            <Logout />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
