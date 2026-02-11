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
import type { ApiErrorResponse } from '@/defines/error.type'
import i18n from '@/i18n/i18n'
import type { Brand } from '@/pages/admin/manage-brand/columns'
import { deleteSoftBrandApi } from '@/services/brand/brand.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface DeleteBrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  brand: Brand
}

export function DeleteBrandDialog({ open, onOpenChange, brand }: DeleteBrandDialogProps) {
  const { t } = useTranslation('brand')

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: () => deleteSoftBrandApi(brand.id),
    onSuccess: () => {
      toast.success(t('message.success.delete'))
      onOpenChange(false)

      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message ?? t('message.error.delete')
      toast.error(message)
    }
  })

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('titles.delete')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('message.success.deleteConfirm', { brandName: brand.brandName })}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{i18n.t('common:common.cancel')}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant='destructive'
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
            >
              <Trash2 className=' h-4 w-4' />
              {t('actions.confirm')}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
