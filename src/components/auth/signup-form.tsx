import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown, Globe } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema } from '@/components/auth/schemas/schemas'
import { Trans, useTranslation } from 'react-i18next'

import { LANGUAGES } from '@/defines/language-constants'
import { useCallback } from 'react'
import type z from 'zod'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t, i18n } = useTranslation('auth')
  const currentLanguage = LANGUAGES.find((lang) => lang.code === i18n.resolvedLanguage)?.label

  type SignUpFormValue = z.infer<typeof signUpSchema>

  const changeLanguage = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang)
    },
    [i18n]
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormValue>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = () => {
    // TODO: gọi api back-end
  }
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className='flex flex-row'>
            <Globe />
            <span className='text-left'>{currentLanguage}</span>
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-100 flex flex-col gap-2'>
          {LANGUAGES.map((lang) => (
            <Button key={lang.code} className='py-5' onClick={() => changeLanguage(lang.code)}>
              {lang.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <a href='/' className='mx-auto block w-fit text-center'>
                  <img src='/logo.svg' alt='Logo' />
                </a>
                <h1 className='text-2xl font-bold'>{t('signup.title')}</h1>
                <p className='text-muted-foreground text-balance'>{t('signup.subtitle')}</p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <Label htmlFor='lastname' className='block text-sm'>
                    {t('signup.lastname')}
                  </Label>
                  <Input type='text' id='lastname' {...register('lastname')} />
                  {errors.lastname && (
                    <p className='text-destructive text-sm'>{errors.lastname.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='firstname' className='block text-sm'>
                    {t('signup.firstname')}
                  </Label>
                  <Input type='text' id='firstname' {...register('firstname')} />
                  {errors.firstname && (
                    <p className='text-destructive text-sm'>{errors.firstname.message}</p>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  {t('signup.username')}
                </Label>
                <Input type='text' id='username' placeholder='VTech' {...register('username')} />
                {errors.username && (
                  <p className='text-destructive text-sm'>{errors.username.message}</p>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='email' className='block text-sm'>
                  {t('signup.email')}
                </Label>
                <Input
                  type='text'
                  id='email'
                  placeholder='vtech@gmail.com'
                  {...register('email')}
                />
                {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='password' className='block text-sm'>
                  {t('signup.password')}
                </Label>
                <Input type='password' id='password' {...register('password')} />
                {errors.password && (
                  <p className='text-destructive text-sm'>{errors.password.message}</p>
                )}
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {t('signup.button')}
              </Button>
              <div className='text-center text-sm'>
                {t('signup.hasAccount')}{' '}
                <a href='/login' className='underline underline-offset-4'>
                  {t('signup.login')}
                </a>
              </div>
            </div>
          </form>
          <div className='bg-muted relative hidden md:block'>
            <img
              src='/placeholderSignUp.png'
              alt='Image'
              className='absolute top-1/2 -translate-y-1/2 object-cover'
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-sm text-balance px-6 text-center text-muted-foreground'>
        <Trans
          i18nKey='signup.term-privacy'
          components={{
            terms: <a href='#' className='underline underline-offset-4 hover:text-primary' />,
            privacy: <a href='#' className='underline underline-offset-4 hover:text-primary' />
          }}
        />
      </div>
    </div>
  )
}
