import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@components/ui/card'
import { DiamondPlus } from 'lucide-react'
import { toast } from 'sonner'

const TestPage = () => {
  const handleClick = () => {
    toast('Thông báo thông thường')
    toast.success('Thao tác thành công')
    toast.error('Có lỗi xảy ra')
    toast.warning('Cảnh báo quan trọng')
    toast.info('Thông tin cập nhật')
  }
  return (
    <Card className='p-6 border-0 bg-gradient-card shadow-custom-lg'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type='text'
          placeholder='Cần phải làm gì?'
          className='h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus: ring-primary/20'
        />
        <Button variant='destructive' size='lg' className='py-5 px-5' onClick={handleClick}>
          <DiamondPlus className='size-5' />
        </Button>
      </div>
    </Card>
  )
}

export default TestPage
