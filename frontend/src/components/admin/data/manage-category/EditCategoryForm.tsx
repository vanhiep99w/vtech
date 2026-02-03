import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import type { Category } from '@/pages/admin/manage-category/columns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  editCategorySchema,
  type EditCategoryFormValues
} from '@/components/admin/data/manage-category/category.schema'
import { toast } from 'sonner'
import { getAllCategoryApi, updateCategoryApi } from '@/services/category/category.api'
import type { AxiosError } from 'axios'
import type { ApiErrorResponse } from '@/defines/error.type'

interface EditCategoryFormProps {
  category: Category
  onSuccess: () => void
}

export function EditCategoryForm({ category, onSuccess }: EditCategoryFormProps) {
  const { t } = useTranslation('category')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      categoryName: category.categoryName,
      slug: category.slug,
      categoryDesc: category.categoryDesc ?? '',
      thumbnailUrl: category.thumbnailUrl ?? '',
      parentId: category.parentId ?? null,
      displayOrder: category.displayOrder ?? 1,
      status: category.status
    }
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoryApi
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (values: EditCategoryFormValues) => updateCategoryApi(category.id, values),
    onSuccess: () => {
      toast.success(t('message.success.update'))
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onSuccess()
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message = error.response?.data?.message ?? t('message.error.update')
      toast.error(message)
    }
  })

  const onSubmit = (values: EditCategoryFormValues) => {
    mutation.mutate(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label>{t('fields.categoryName.label')}</Label>
          <Input {...register('categoryName')} />
          {errors.categoryName && (
            <p className='text-destructive text-sm'>{errors.categoryName.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.slug.label')}</Label>
          <Input {...register('slug')} />
          {errors.slug && <p className='text-destructive text-sm'>{errors.slug.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.thumbnailUrl.label')}</Label>
          <Input {...register('thumbnailUrl')} />
          {errors.thumbnailUrl && (
            <p className='text-destructive text-sm'>{errors.thumbnailUrl.message}</p>
          )}
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.displayOrder.label')}</Label>
          <Input
            type='number'
            min={0}
            step={1}
            {...register('displayOrder', { valueAsNumber: true })}
          />
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.parent.label')}</Label>
          <Controller
            control={control}
            name='parentId'
            render={({ field }) => (
              <Select
                value={field.value ?? 'none'}
                onValueChange={(value) => field.onChange(value === 'none' ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('fields.parent.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='none'>{t('fields.parent.none')}</SelectItem>
                  {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.status.label')}</Label>
          <Controller
            control={control}
            name='status'
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>{t('fields.status.options.ACTIVE')}</SelectItem>
                  <SelectItem value='0'>{t('fields.status.options.INACTIVE')}</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Description */}
        <div className='space-y-2 md:col-span-2'>
          <Label>{t('fields.categoryDesc.label')}</Label>
          <Input {...register('categoryDesc')} />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button type='submit' disabled={mutation.isPending}>
          {t('actions.edit')}
        </Button>
      </div>
    </form>
  )
}
