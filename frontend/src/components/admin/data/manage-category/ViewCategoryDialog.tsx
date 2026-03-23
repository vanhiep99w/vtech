import { CategoryStatusBadge } from '@/components/admin/data/manage-category/CategoryStatusBadges'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { IMGAE_NOT_FOUND } from '@/defines/upload-image'
import type { Category } from '@/pages/admin/manage-category/columns'
import { useTranslation } from 'react-i18next'

interface ViewUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category
}

export function ViewCategoryDialog({ open, onOpenChange, category }: ViewUserDialogProps) {
  const { t } = useTranslation('category')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[720px] p-0 overflow-hidden'>
        <DialogHeader className='px-6 py-4 border-b'>
          <DialogTitle className='text-lg font-semibold'>{t('titles.view')}</DialogTitle>
        </DialogHeader>

        <div className='max-h-[80vh] overflow-y-auto'>
          <div className='relative h-[220px] bg-muted'>
            <img
              src={category.thumbnailUrl ?? IMGAE_NOT_FOUND}
              alt={category.categoryName}
              className='w-full h-full object-cover'
            />

            <div className='absolute inset-0 bg-black/30 flex items-end'>
              <div className='p-4 text-white'>
                <h2 className='text-xl font-semibold'>{category.categoryName}</h2>
                <p className='text-sm opacity-90'>{category.slug}</p>
              </div>
            </div>
          </div>

          <div className='p-6 space-y-6'>
            <Section title={t('sections.basicInfo')}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Info label={t('fields.categoryName.label')} value={category.categoryName} />
                <Info label={t('fields.slug.label')} value={category.slug} />
                <Info label={t('fields.parent.label')} value={category.parentName} />
                <Info label={t('fields.categoryDesc.label')} value={category.categoryDesc} />
              </div>
            </Section>

            <Section title={t('fields.status.label')}>
              <CategoryStatusBadge status={category.status} />
            </Section>

            <Separator />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <Info label={t('fields.createdAt')} value={category.createdAt} muted />
              <Info label={t('fields.updatedAt')} value={category.updatedAt} muted />
            </div>

            <div className='flex justify-end pt-4'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                {t('actions.close')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='space-y-3'>
      <h3 className='text-sm font-medium text-muted-foreground uppercase tracking-wide'>{title}</h3>
      {children}
    </div>
  )
}

function Info({ label, value, muted }: { label: string; value?: string | null; muted?: boolean }) {
  return (
    <div className='space-y-1'>
      <Label className='text-muted-foreground text-xs'>{label}</Label>
      <p className={`font-medium ${muted ? 'text-muted-foreground' : ''}`}>{value || '-'}</p>
    </div>
  )
}
