//package com.haui.vtech.controller;
//
//import com.haui.vtech.io.AuthRequest;
//import com.haui.vtech.io.AuthResponse;
//import com.haui.vtech.service.AppUserDetailsService;
//import com.haui.vtech.util.JwtUtil;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.Duration;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/users")
//@RequiredArgsConstructor
//public class AuthController extends BaseController{
//
//    private final AuthenticationManager authenticationManager;
//    private final AppUserDetailsService appUserDetailsService;
//    private final JwtUtil jwtUtil;
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
//        try {
//            authenticate(request.getEmail(), request.getPassword());
//            final UserDetails userDetails =  appUserDetailsService.loadUserByUsername(request.getEmail());
//            final String jwtToken = jwtUtil.generateToken(userDetails);
//            ResponseCookie cookie = ResponseCookie.from(jwtToken)
//                    .httpOnly(true)
//                    .path("/")
//                    .maxAge(Duration.ofDays(1))
//                    .sameSite("Strict")
//                    .build();
//            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new AuthResponse(request.getEmail(), jwtToken));
//        } catch (BadCredentialsException ex) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", true);
//            error.put("message", "Email hoặc mật khẩu không đúng!");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
//        } catch (DisabledException ex) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", true);
//            error.put("message", "Tài khoản đã bị vô hiệu hoá!");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//        } catch (Exception ex) {
//            Map<String, Object> error = new HashMap<>();
//            error.put("error", true);
//            error.put("message", "Xác thực thất bại!");
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
//        }
//    }
//
//    private void authenticate(String email, String password) {
//        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
//    }
//}
