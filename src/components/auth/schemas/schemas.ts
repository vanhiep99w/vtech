import { z } from 'zod'

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

export { logInSchema, signUpSchema }
