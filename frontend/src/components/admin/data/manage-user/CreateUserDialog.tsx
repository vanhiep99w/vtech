import { CreateUserForm } from '@/components/admin/data/manage-user/CreateUserForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function CreateUserDialog() {
  const { t } = useTranslation('user')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ml-auto'>
          <Plus className='mr-2 h-4 w-4' />
          {t('create.button')}
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[700px] p-0'>
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle>{t('dialogTitle.create')}</DialogTitle>
        </DialogHeader>
        <div className='max-h-[80vh] overflow-y-auto px-6 pb-6'>
          <CreateUserForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}
