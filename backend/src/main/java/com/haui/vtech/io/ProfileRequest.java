package com.haui.vtech.io;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileRequest {
    @NotBlank(message = "Username không được để trống!")
    private String username;
    @Email(message = "Email không đúng định dạng!")
    @NotBlank(message = "Email không được để trống!")
    private String email;
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự!")
    private String password;
}
