package com.haui.vtech.io.user;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserResponse {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private String avatar;
    private Integer status;
    private Set<String> roles;
}
