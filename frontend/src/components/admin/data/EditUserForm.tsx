import { editUserSchema, type EditUserFormValues } from './user.schema'
import { updateUserApi } from '@/services/user/user.api'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import type { User } from '@/pages/admin/manage-user/columns'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface EditUserFormProps {
  user: User
  onSuccess: () => void
}

export function EditUserForm({ user, onSuccess }: EditUserFormProps) {
  const { t } = useTranslation('user')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user.username,
      fullName: user.fullName ?? '',
      phone: user.phone ?? '',
      avatar: user.avatar ?? '',
      status: user.status === 1 ? 'ACTIVE' : 'INACTIVE'
    }
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (values: EditUserFormValues) =>
      updateUserApi(user.id, {
        username: values.username,
        fullName: values.fullName,
        phone: values.phone,
        avatar: values.avatar,
        status: values.status === 'ACTIVE' ? 1 : 0
      }),
    onSuccess: () => {
      toast.success(t('message.success.update'))
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onSuccess()
    },
    onError: () => {
      toast.error(t('message.error.update'))
    }
  })

  return (
    <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className='space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label>{t('fields.username.label')}</Label>
          <Input {...register('username')} />
          {errors.username && <p className='text-destructive'>{errors.username.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.fullName.label')}</Label>
          <Input {...register('fullName')} />
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.phone.label')}</Label>
          <Input {...register('phone')} />
          {errors.phone && <p className='text-destructive text-sm'>{errors.phone.message}</p>}
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.avatar.label')}</Label>
          <Input {...register('avatar')} />
        </div>

        <div className='space-y-2'>
          <Label>{t('fields.status.label')}</Label>
          <Controller
            control={control}
            name='status'
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='ACTIVE' className='text-green-600'>
                    <span className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-green-500' />
                      {t('fields.status.options.ACTIVE')}
                    </span>
                  </SelectItem>
                  <SelectItem value='INACTIVE' className='text-muted-foreground'>
                    <span className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-gray-400' />
                      {t('fields.status.options.INACTIVE')}
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
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
