package com.haui.vtech.io.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Set;

@Data
public class ProfileUpdateRequest {
    @NotBlank(message = "USERNAME_NOTBLANK")
    private String username;
    private String fullName;
    private String phone;
    private String avatar;
    private Integer status;
    private Set<String> roles;
}
