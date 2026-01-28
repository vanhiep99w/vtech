import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteUserApi } from '@/services/user/user.api'
import { toast } from 'sonner'
import type { User } from '@/pages/admin/manage-user/columns'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import i18n from '@/i18n/i18n'
import type { AxiosError } from 'axios'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
  onDeleted: () => void
}

export function DeleteUserDialog({ open, onOpenChange, user, onDeleted }: DeleteUserDialogProps) {
  const { t } = useTranslation('user')
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteUserApi(user.id)
      toast.success(t('message.success.delete'))
      onOpenChange(false)
      onDeleted()
    } catch (error: unknown) {
      const err = error as AxiosError<{ message?: string }>
      toast.error(err.response?.data?.message || t('message.error.delete'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('dialogTitle.delete')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('message.success.deleteConfirm', { email: user.email })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>{i18n.t('common:common.cancel')}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant='destructive' onClick={handleDelete} disabled={loading}>
              <Trash2 className=' h-4 w-4' />
              {t('actions.confirm')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
