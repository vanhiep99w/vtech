import {
  createCategorySchema,
  type CreateCategoryFormValues
} from '@/components/admin/data/manage-category/category.schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { createCategoryApi, getAllCategoryApi } from '@/services/category/category.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FolderPlus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

interface CreateCategoryFormProps {
  onSuccess: () => void
}

export function CreateCategoryForm({ onSuccess }: CreateCategoryFormProps) {
  const { t } = useTranslation('category')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      displayOrder: 1
    }
  })

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategoryApi
  })

  // const parentCategories = categories.filter((c) => !c.parentId)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      toast.success('Tạo danh mục thành công')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onSuccess()
    },
    onError: () => {
      toast.error('Tạo danh mục thất bại')
    }
  })

  const onSubmit = async (data: CreateCategoryFormValues) => {
    mutation.mutate({
      ...data,
      parentId: data.parentId || null
    })
  }

  return (
    <Card className='border-none shadow-none'>
      <CardHeader className='px-0 pt-0'>
        <div className='flex items-center gap-2'>
          <FolderPlus className='h-5 w-5 text-primary' />
          <CardTitle>{t('create.title', 'Tạo danh mục')}</CardTitle>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className='px-0 pt-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* ===== BASIC INFO ===== */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Thông tin cơ bản</h3>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* ===== LEFT: TEXT INFO ===== */}
              <div className='md:col-span-2 space-y-4'>
                {/* Category Name */}
                <div className='space-y-2'>
                  <Label>Tên danh mục *</Label>
                  <Input
                    placeholder='Ví dụ: iPhone X'
                    {...register('categoryName')}
                    className={errors.categoryName ? 'border-destructive' : ''}
                  />
                  {errors.categoryName && (
                    <p className='text-sm text-destructive'>{errors.categoryName.message}</p>
                  )}
                </div>

                {/* Slug */}
                <div className='space-y-2'>
                  <Label>Slug *</Label>
                  <Input
                    placeholder='iphone-x'
                    {...register('slug')}
                    className={errors.slug ? 'border-destructive' : ''}
                  />
                  {errors.slug && <p className='text-sm text-destructive'>{errors.slug.message}</p>}
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <Label>Mô tả</Label>
                  <Input placeholder='Mô tả danh mục' {...register('categoryDesc')} />
                </div>
              </div>

              {/* ===== RIGHT: THUMBNAIL ===== */}
              <div className='space-y-3'>
                <Label>Thumbnail</Label>

                {/* Preview */}
                <div className='w-full aspect-video rounded-md border bg-muted flex items-center justify-center overflow-hidden'>
                  <img
                    src='https://ui.shadcn.com/avatars/02.png'
                    alt='thumbnail-preview'
                    className='object-cover w-full h-full'
                  />
                </div>

                {/* URL input */}
                <Input placeholder='https://example.com/image.png' {...register('thumbnailUrl')} />
                {errors.thumbnailUrl && (
                  <p className='text-sm text-destructive'>{errors.thumbnailUrl.message}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* ===== RELATION & MEDIA ===== */}
          <div className='space-y-4'>
            <h3 className='text-lg font-medium'>Phân loại & hiển thị</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Parent */}
              <div className='space-y-2'>
                <Label>Danh mục cha</Label>
                <Controller
                  control={control}
                  name='parentId'
                  render={({ field }) => (
                    <Select value={field.value ?? ''} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn danh mục cha' />
                      </SelectTrigger>
                      <SelectContent>
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

              {/* Display Order */}
              <div className='space-y-2'>
                <Label>Thứ tự hiển thị</Label>
                <Input
                  type='number'
                  min={0}
                  step={1}
                  {...register('displayOrder', { valueAsNumber: true })}
                />

                {errors.displayOrder && (
                  <p className='text-sm text-destructive'>{errors.displayOrder.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* ===== ACTIONS ===== */}
          <div className='flex justify-end gap-3 pt-4 border-t'>
            <Button type='submit' disabled={mutation.isPending}>
              <FolderPlus className='mr-2 h-4 w-4' />
              Tạo danh mục
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
