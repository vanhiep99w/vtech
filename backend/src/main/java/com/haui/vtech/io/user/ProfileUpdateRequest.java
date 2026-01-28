package com.haui.vtech.io.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProfileUpdateRequest {
    @NotBlank(message = "USERNAME_NOTBLANK")
    private String username;
    private String fullName;
    private String phone;
    private String avatar;
    private Integer status;
}
