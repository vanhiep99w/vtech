import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const logInSchema = z.object({
  email: z.string().min(1, 'Email không được để trống!').email('Email không hợp lệ !'),
  password: z
    .string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự ! ')
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa!'
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Mật khẩu phải chứa ít nhất 1 chữ thường!'
    })
    .refine((val) => /\d/.test(val), {
      message: 'Mật khẩu phải chứa ít nhất 1 số!'
    })
    .refine((val) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val), {
      message: 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!'
    })
})

type logInFormValue = z.infer<typeof logInSchema>

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<logInFormValue>({
    resolver: zodResolver(logInSchema)
  })

  const onSubmit = () => {}

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <a href='/' className='mx-auto block w-fit text-center'>
                  <img src='/logo.svg' alt='Logo' />
                </a>
                <h1 className='text-2xl font-bold'>Chào mừng quay trở lại</h1>
                <p className='text-muted-foreground text-balance'>
                  Đăng nhập vào tài khoản VTech của bạn
                </p>
              </div>

              <div className='flex flex-col gap-3'>
                <Label htmlFor='email' className='block text-sm'>
                  Email
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
                  Password
                </Label>
                <Input type='password' id='password' {...register('password')} />
                {errors.password && (
                  <p className='text-destructive text-sm'>{errors.password.message}</p>
                )}
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Đăng nhập
              </Button>
              <div className='text-center text-sm'>
                Bạn chưa tài khoản?{' '}
                <a href='/signup' className='underline underline-offset-4'>
                  Đăng ký
                </a>
              </div>
            </div>
          </form>
          <div className='bg-muted relative hidden md:block'>
            <img
              src='/placeholder.png'
              alt='Image'
              className='absolute top-1/2 -translate-y-1/2 object-cover'
            />
          </div>
        </CardContent>
      </Card>
      <div className='text-sm text-balance px-6 text-center text-muted-foreground'>
        Bằng cách tiếp tục, Bạn đồng ý với{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Điều khoản dịch vụ{' '}
        </a>
        và{' '}
        <a href='#' className='underline underline-offset-4 hover:text-primary'>
          Chính sách bảo mật{' '}
        </a>
        của chúng tôi.
      </div>
    </div>
  )
}
