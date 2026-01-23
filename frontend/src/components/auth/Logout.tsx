import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth.store'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Logout = () => {
  const navigate = useNavigate()

  const { logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    toast.success('Đăng xuất thành công')
    navigate('/login')
  }

  return (
    <Button variant='default' size='lg' className='py-5 px-5' onClick={handleLogout}>
      <LogOut className='size-5' />
    </Button>
  )
}

export default Logout
