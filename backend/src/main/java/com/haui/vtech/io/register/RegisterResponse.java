package com.haui.vtech.io.register;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResponse {
    private String id;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private String avatar;
    private Integer status;
}
