package com.haui.vtech.io;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
