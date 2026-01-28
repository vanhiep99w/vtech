import { createUserSchema, type CreateUserFormValues } from '@/components/admin/data/user.schema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserPlus } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export function CreateUserForm() {
  const { t } = useTranslation('user')
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: 'USER',
      status: 'ACTIVE'
    }
  })

  // const onSubmit = async (data: CreateUserFormValues) => {
  const onSubmit = async () => {
    // TODO: api create user
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader className='space-y-1'>
        <div className='flex items-center gap-2'>
          <UserPlus className='h-5 w-5 text-primary' />
          <CardTitle>{t('create.cardTitle')}</CardTitle>
        </div>
        <CardDescription>{t('create.description')}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-6'>
            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                {t('create.sections.personal')}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='username'>{t('fields.username.label')}</Label>
                  <Input
                    id='username'
                    placeholder={t('fields.username.placeholder')}
                    {...register('username')}
                    className={errors.username ? 'border-destructive' : ''}
                  />
                  {errors.username && (
                    <p className='text-sm text-destructive mt-1'>{errors.username.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='email'>{t('fields.email.label')}</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder={t('fields.email.placeholder')}
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className='text-sm text-destructive mt-1'>{errors.email.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='fullName'>{t('fields.fullName.label')}</Label>
                  <Input
                    id='fullName'
                    placeholder={t('fields.fullName.placeholder')}
                    {...register('fullName')}
                    className={errors.fullName ? 'border-destructive' : ''}
                  />
                  {errors.fullName && (
                    <p className='text-sm text-destructive mt-1'>{errors.fullName.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>{t('fields.phone.label')}</Label>
                  <Input
                    id='phone'
                    placeholder={t('fields.phone.placeholder')}
                    {...register('phone')}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className='text-sm text-destructive mt-1'>{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <h3 className='text-lg font-medium text-foreground'>
                {t('create.sections.account')}
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='password'>{t('fields.password.label')}</Label>
                  <Input
                    id='password'
                    type='password'
                    {...register('password')}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  {errors.password && (
                    <p className='text-sm text-destructive mt-1'>{errors.password.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='role'>{t('fields.role.label')}</Label>
                  <Controller
                    control={control}
                    name='role'
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                          <SelectValue placeholder='Select a role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='ADMIN'>{t('fields.role.options.ADMIN')}</SelectItem>
                          <SelectItem value='USER'>{t('fields.role.options.USER')}</SelectItem>
                          <SelectItem value='STAFF'>{t('fields.role.options.STAFF')}</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className='text-sm text-destructive mt-1'>{errors.role.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='status'>{t('fields.status.label')}</Label>
                  <Controller
                    control={control}
                    name='status'
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                          <SelectValue placeholder='Select status' />
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
                  {errors.status && (
                    <p className='text-sm text-destructive mt-1'>{errors.status.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className='flex justify-end gap-3 pt-4 border-t'>
              <Button type='submit' className='min-w-[100px]' disabled={isSubmitting}>
                <UserPlus className='mr-2 h-4 w-4' />
                {t('actions.submit')}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
