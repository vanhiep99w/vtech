import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown, Globe } from 'lucide-react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { createSignUpSchema, type SignUpFormData } from '@/components/auth/schemas/schemas'
import { Trans, useTranslation } from 'react-i18next'
import { locales } from '@/i18n/i18n'
import { useEffect } from 'react'

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { t, i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const signUpSchema = createSignUpSchema(t)

  useEffect(() => {
    const language = localStorage.getItem('LANGUAGE')
    if (language) {
      i18n.changeLanguage(language)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
    localStorage.setItem('LANGUAGE', i18n.language)
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
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
          <Button className='py-5' onClick={() => changeLanguage('vi')}>
            Tiếng Việt
          </Button>
          <Button className='py-5 px-10' onClick={() => changeLanguage('en')}>
            Tiếng Anh
          </Button>
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
                <h1 className='text-2xl font-bold'>{t('auth.signup.title')}</h1>
                <p className='text-muted-foreground text-balance'>{t('auth.signup.subtitle')}</p>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <Label htmlFor='lastname' className='block text-sm'>
                    {t('auth.signup.lastname')}
                  </Label>
                  <Input type='text' id='lastname' {...register('lastname')} />
                  {errors.lastname && (
                    <p className='text-destructive text-sm'>{errors.lastname.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='firstname' className='block text-sm'>
                    {t('auth.signup.firstname')}
                  </Label>
                  <Input type='text' id='firstname' {...register('firstname')} />
                  {errors.firstname && (
                    <p className='text-destructive text-sm'>{errors.firstname.message}</p>
                  )}
                </div>
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  {t('auth.signup.username')}
                </Label>
                <Input type='text' id='username' placeholder='VTech' {...register('username')} />
                {errors.username && (
                  <p className='text-destructive text-sm'>{errors.username.message}</p>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='email' className='block text-sm'>
                  {t('auth.signup.email')}
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
                  {t('auth.signup.password')}
                </Label>
                <Input type='password' id='password' {...register('password')} />
                {errors.password && (
                  <p className='text-destructive text-sm'>{errors.password.message}</p>
                )}
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {t('auth.signup.button')}
              </Button>
              <div className='text-center text-sm'>
                {t('auth.signup.hasAccount')}{' '}
                <a href='/login' className='underline underline-offset-4'>
                  {t('auth.signup.login')}
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
          i18nKey='auth.signup.term-privacy'
          components={{
            terms: <a href='#' className='underline underline-offset-4 hover:text-primary' />,
            privacy: <a href='#' className='underline underline-offset-4 hover:text-primary' />
          }}
        />
      </div>
    </div>
  )
}
