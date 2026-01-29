package com.haui.vtech.service;

import com.haui.vtech.entity.RoleEntity;
import com.haui.vtech.entity.UserEntity;
import com.haui.vtech.enums.Role;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.user.*;
import com.haui.vtech.mapper.UserMapper;
import com.haui.vtech.repository.RoleRepository;
import com.haui.vtech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXSISTED);
        }

        UserEntity newUser = userMapper.toEntity(request);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        Set<RoleEntity> roles = new HashSet<>();
        RoleEntity role = roleRepository.findByName(Role.USER.name())
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        roles.add(role);
        newUser.setRoles(roles);

        UserEntity savedUser = userRepository.save(newUser);
        return userMapper.toUserResponse(savedUser);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> findAll() {
        log.info("Method get all users");
        return userRepository.findAll().stream().map(userMapper::toUserResponse).toList();
    }

    @PostAuthorize("returnObject.email == authentication.name || hasRole('ADMIN')")
    public UserResponse findById(String id) {
        log.info("Method get user by id");
        return userMapper.toUserResponse(userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        return userMapper.toUserResponse(userRepository.findByEmail(name)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXSISTED)));
    }

    @PostAuthorize("returnObject.email == authentication.name || hasRole('ADMIN')")
    public ProfileUpdateResponse update(String id, ProfileUpdateRequest request) {
        UserEntity userEntity = userRepository.findById(id)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateUser(userEntity, request);
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {

            Set<RoleEntity> roles = request.getRoles().stream()
                    .map(roleName -> roleRepository.findByName(roleName)
                            .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND)))
                    .collect(Collectors.toSet());

            userEntity.setRoles(roles);
        }
        return userMapper.toProfileUpdateResponse(userRepository.save(userEntity));
    }

    @PreAuthorize("hasRole('ADMIN')")
    public void delete(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (user.getEmail().equals(currentUserEmail)) {
            throw new AppException(ErrorCode.CANNOT_DELETE_SELF);
        }

        userRepository.deleteById(userId);
    }

    public void changePassword(PasswordUpdateRequest request) {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXSISTED));

        //  Kiểm tra mật khẩu cũ đúng
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.OLD_PASSWORD_INVALID);
        }

        // Kiểm tra mật khẩu mới khác mật khẩu cũ
        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.NEW_PASSWORD_SAME_AS_OLD);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
