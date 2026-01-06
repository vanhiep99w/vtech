import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const signUpSchema = z.object({
  lastname: z.string().min(1, 'Họ bắt buộc phải có !'),
  firstname: z.string().min(1, 'Tên bắt buộc phải có !'),
  username: z.string().min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự !'),
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

type singUpFormValue = z.infer<typeof signUpSchema>

export function SignupForm({ className, ...props }: React.ComponentProps<'div'>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<singUpFormValue>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = () => {}

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              {/* header - logo */}
              <div className='flex flex-col items-center gap-2'>
                <a href='/' className='mx-auto block w-fit text-center'>
                  <img src='/logo.svg' alt='Logo' />
                </a>
                <h1 className='text-2xl font-bold'>Tạo tài khoản</h1>
                <p className='text-muted-foreground text-balance'>
                  Chào mừng bạn! Hãy đăng ký để bắt đầu
                </p>
              </div>

              {/* Họ và tên */}
              <div className='grid grid-cols-2 gap-3'>
                <div className='space-y-2'>
                  <Label htmlFor='lastname' className='block text-sm'>
                    Họ
                  </Label>
                  <Input type='text' id='lastname' {...register('lastname')} />
                  {errors.lastname && (
                    <p className='text-destructive text-sm'>{errors.lastname.message}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='firstname' className='block text-sm'>
                    Tên
                  </Label>
                  <Input type='text' id='firstname' {...register('firstname')} />
                  {errors.firstname && (
                    <p className='text-destructive text-sm'>{errors.firstname.message}</p>
                  )}
                </div>
              </div>

              {/* username */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='username' className='block text-sm'>
                  Username
                </Label>
                <Input type='text' id='username' placeholder='VTech' {...register('username')} />
                {errors.username && (
                  <p className='text-destructive text-sm'>{errors.username.message}</p>
                )}
              </div>

              {/* email */}
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

              {/* password */}
              <div className='flex flex-col gap-3'>
                <Label htmlFor='password' className='block text-sm'>
                  Password
                </Label>
                <Input type='password' id='password' {...register('password')} />
                {errors.password && (
                  <p className='text-destructive text-sm'>{errors.password.message}</p>
                )}
              </div>
              {/* confirm password */}

              {/* Nút đăng ký */}
              <Button type='submit' className='w-full' disabled={isSubmitting}>
                Tạo tài khoản
              </Button>
              <div className='text-center text-sm'>
                Bạn đã có tài khoản?{' '}
                <a href='/login' className='underline underline-offset-4'>
                  Đăng nhập
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
