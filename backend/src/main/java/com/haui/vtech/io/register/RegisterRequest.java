package com.haui.vtech.io.register;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {
    @NotBlank(message = "USERNAME_NOTBLANK")
    private String username;
    @Email(message = "EMAIL_VALID")
    @NotBlank(message = "EMAIL_NOTBLANK")
    private String email;
    @Size(min = 6, message = "PASSWORD_INVALID")
    private String password;
}
