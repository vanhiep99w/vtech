package com.haui.vtech.controller.admin;

import com.haui.vtech.io.ApiResponse;
import com.haui.vtech.io.user.*;
import com.haui.vtech.service.UserService;
import com.haui.vtech.util.MessageUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v2/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final MessageUtil messageUtil;

    @PostMapping("/register")
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody UserCreationRequest request ) {
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(userService.createUser(request));
        apiResponse.setMessage(messageUtil.getMesage("created.success"));
        return apiResponse;
    }

    @GetMapping("/getall")
    public ApiResponse<List<UserResponse>> getAllUsers() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        log.info("Authentication: {}", authentication);
        log.info("Email: {}", authentication.getName());
        authentication.getAuthorities().forEach(
                grantedAuthority -> log.info("Roles: {}", grantedAuthority.getAuthority()));


        return  ApiResponse.<List<UserResponse>>builder()
                .data(userService.findAll())
                .build();
    }

    @GetMapping("/{userId}")
    public UserResponse getUser(@PathVariable String userId) {
        return  userService.findById(userId);
    }

    @GetMapping("/my-info")
    public UserResponse getMyInfo() {
        return  userService.getMyInfo();
    }

    @PutMapping("/{userId}")
    public ApiResponse<ProfileUpdateResponse>  updateUser(@PathVariable String userId, @Valid @RequestBody ProfileUpdateRequest request) {
        ApiResponse<ProfileUpdateResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(userService.update(userId, request));
        apiResponse.setMessage(messageUtil.getMesage("updated.success"));
        return apiResponse;
    }

    @DeleteMapping("/{userId}")
    public ApiResponse<Void> deleteUser(@PathVariable String userId) {
        userService.delete(userId);
        return ApiResponse.<Void>builder()
                .message(messageUtil.getMesage("deleted.success"))
                .build();
    }

    @PutMapping("/change-password")
    public ApiResponse<Void> changePassword(@Valid @RequestBody PasswordUpdateRequest request) {
        userService.changePassword(request);
        return ApiResponse.<Void>builder()
                .message(messageUtil.getMesage("password.changed.success"))
                .build();
    }
}
