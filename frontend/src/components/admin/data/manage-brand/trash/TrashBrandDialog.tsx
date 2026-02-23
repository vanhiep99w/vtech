import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { IMGAE_NOT_FOUND } from '@/defines/upload-image'
import { getAllBrandInTrashApi, restoreBrandApi } from '@/services/brand/brand.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { RotateCcwSquare, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { format, addDays, differenceInDays } from 'date-fns'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/defines/error.type'
import { useState } from 'react'
import type { Brand } from '@/pages/admin/manage-brand/columns'
import { HardDeleteBrandDialog } from '@/components/admin/data/manage-brand/trash/HardDeleteBrandDialog'

export function TrashBrandDialog() {
  const { t } = useTranslation('brand')

  const { data = [] } = useQuery({
    queryKey: ['brands-trash'],
    queryFn: getAllBrandInTrashApi
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (brandId: string) => restoreBrandApi(brandId),
    onSuccess: () => {
      toast.success(t('message.success.restore'))

      queryClient.invalidateQueries({ queryKey: ['brands'] })
      queryClient.invalidateQueries({ queryKey: ['brands-trash'] })
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message ?? t('message.error.restore')
      toast.error(message)
    }
  })

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [openDelete, setOpenDelete] = useState(false)

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='default'>
            <Trash2 />
          </Button>
        </DialogTrigger>

        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>{t('titles.trash')}</DialogTitle>
          </DialogHeader>

          <div className='mt-4 border rounded-md overflow-hidden'>
            <table className='w-full text-sm'>
              <thead className='bg-muted'>
                <tr>
                  <th className='text-left p-3 w-1/3'>{t('table.columns.brand')}</th>
                  <th className='text-left p-3 w-1/3'>{t('fields.deletedAt')}</th>
                  <th className='text-center p-3 w-1/4'>{t('table.columns.actions')}</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={3} className='text-center p-4'>
                      {t('trash.trashEmpty')}
                    </td>
                  </tr>
                ) : (
                  data.map((brand) => (
                    <tr key={brand.id} className='border-t'>
                      <td className='p-3'>
                        <div className='flex items-center gap-3'>
                          <img
                            src={brand.brandLogo ?? IMGAE_NOT_FOUND}
                            alt={brand.brandName}
                            className='h-10 w-10 rounded-full border object-cover'
                          />

                          <div className='flex flex-col'>
                            <span className='font-medium'>{brand.brandName}</span>
                            <span className='text-xs text-muted-foreground'>{brand.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className='p-3'>
                        {brand.deletedAt &&
                          (() => {
                            const deletedDate = new Date(brand.deletedAt)
                            const expiredDate = addDays(deletedDate, 30)
                            const remainingDays = differenceInDays(expiredDate, new Date())

                            return (
                              <div className='flex flex-col'>
                                <span>{format(deletedDate, 'dd/MM/yyyy HH:mm')}</span>
                                {
                                  <span className='text-xs text-muted-foreground'>
                                    {t('trash.remainingDays', { days: remainingDays })}
                                  </span>
                                }
                              </div>
                            )
                          })()}
                      </td>

                      <td className='p-3 text-center space-x-2'>
                        <Button
                          size='sm'
                          variant='secondary'
                          onClick={() => mutation.mutate(brand.id)}
                          disabled={mutation.isPending}
                        >
                          <RotateCcwSquare size={18} />
                        </Button>

                        <Button
                          size='sm'
                          variant='destructive'
                          onClick={() => {
                            setSelectedBrand(brand)
                            setOpenDelete(true)
                          }}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
      {selectedBrand && (
        <HardDeleteBrandDialog
          open={openDelete}
          onOpenChange={setOpenDelete}
          brand={selectedBrand}
        />
      )}
    </>
  )
}
