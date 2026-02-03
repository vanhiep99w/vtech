import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useTranslation } from 'react-i18next'
import { UserStatusBadge } from '@/components/admin/data/manage-user/UserStatusBadges'
import type { Category } from '@/pages/admin/manage-category/columns'

interface ViewUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category
}

export function ViewCategoryDialog({ open, onOpenChange, category }: ViewUserDialogProps) {
  const { t } = useTranslation('category')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] p-0'>
        <DialogHeader className='px-6 pt-6'>
          <DialogTitle>Thông tin danh mục</DialogTitle>
        </DialogHeader>

        <div className='max-h-[80vh] overflow-y-auto px-6 pb-6'>
          <Card className='border-none shadow-none'>
            <CardHeader className='pb-2'>
              <img
                src={'https://ui.shadcn.com/avatars/02.png'}
                alt={category.categoryName}
                className='w-full h-[200px] object-cover rounded-t-lg'
              />
            </CardHeader>

            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Info label={t('fields.categoryName.label')} value={category.categoryName} />
                  <Info label={t('fields.slug.label')} value={category.slug} />
                </div>
              </div>

              <div className='space-y-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <Info label={t('fields.parent.label')} value={category.parentName} />
                  <Info label={t('fields.categoryDesc.label')} value={category.categoryDesc} />
                </div>
              </div>

              <div className='space-y-3'>
                <div className='space-y-1'>
                  <Label className='text-muted-foreground block mb-1'>
                    {t('fields.status.label')}
                  </Label>
                  <UserStatusBadge status={category.status} />
                </div>
              </div>

              <Separator />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground'>
                <Info label={t('fields.createdAt')} value={category.createdAt} />
                <Info label={t('fields.updatedAt')} value={category.updatedAt} />
              </div>

              <div className='flex justify-end pt-4'>
                <Button variant='outline' onClick={() => onOpenChange(false)}>
                  {t('actions.close')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className='space-y-1'>
      <Label className='text-muted-foreground'>{label}</Label>
      <p className='font-medium'>{value || '-'}</p>
    </div>
  )
}
