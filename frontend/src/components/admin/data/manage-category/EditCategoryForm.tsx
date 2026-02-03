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
  const { t } = useTranslation('user')
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
      toast.success('Cập nhật thành công')
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
        {/* Category name */}
        <div className='space-y-2'>
          <Label>Tên danh mục</Label>
          <Input {...register('categoryName')} />
          {errors.categoryName && (
            <p className='text-destructive text-sm'>{errors.categoryName.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className='space-y-2'>
          <Label>Slug</Label>
          <Input {...register('slug')} />
          {errors.slug && <p className='text-destructive text-sm'>{errors.slug.message}</p>}
        </div>

        {/* Thumbnail */}
        <div className='space-y-2'>
          <Label>Thumbnail URL</Label>
          <Input {...register('thumbnailUrl')} />
          {errors.thumbnailUrl && (
            <p className='text-destructive text-sm'>{errors.thumbnailUrl.message}</p>
          )}
        </div>

        {/* Display order */}
        <div className='space-y-2'>
          <Label>Thứ tự hiển thị</Label>
          <Input
            type='number'
            min={0}
            step={1}
            {...register('displayOrder', { valueAsNumber: true })}
          />
        </div>

        {/* Parent category */}
        <div className='space-y-2'>
          <Label>Danh mục cha</Label>
          <Controller
            control={control}
            name='parentId'
            render={({ field }) => (
              <Select
                value={field.value ?? 'none'}
                onValueChange={(value) => field.onChange(value === 'none' ? null : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Không có' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='none'>Không có</SelectItem>
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

        {/* Status */}
        <div className='space-y-2'>
          <Label>Trạng thái</Label>
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
                  <SelectItem value='1'>Hoạt động</SelectItem>
                  <SelectItem value='0'>Ẩn</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Description */}
        <div className='space-y-2 md:col-span-2'>
          <Label>Mô tả</Label>
          <Input {...register('categoryDesc')} />
        </div>
      </div>

      <div className='flex justify-end'>
        <Button type='submit' disabled={mutation.isPending}>
          Cập nhật
        </Button>
      </div>
    </form>
  )
}
