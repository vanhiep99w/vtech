package com.haui.vtech.io.login;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String token;
    private boolean authenticated;
    private Set<String> roles;
}
