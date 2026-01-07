import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LANGUAGES } from '@/defines/language-constants'
import { Card } from '@components/ui/card'
import { ChevronDown, DiamondPlus, Globe } from 'lucide-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

const TestPage = () => {
  const handleClick = () => {
    toast('Thông báo thông thường')
    toast.success('Thao tác thành công')
    toast.error('Có lỗi xảy ra')
    toast.warning('Cảnh báo quan trọng')
    toast.info('Thông tin cập nhật')
  }
  const { t, i18n } = useTranslation('product')
  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
    },
    [i18n]
  )
  return (
    <>
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
      <span>{t('addtocart')}</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='flex flex-row'>
            <Globe />

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-100 flex flex-col gap-2'>
          {LANGUAGES.map((lang) => (
            <Button key={lang.code} className='py-5' onClick={() => changeLanguage(lang.code)}>
              {lang.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </>
  )
}

export default TestPage
