package com.haui.vtech.service;

import com.haui.vtech.entity.BaseEntity;
import com.haui.vtech.entity.UserEntity;
import com.haui.vtech.io.ProfileRequest;
import com.haui.vtech.io.ProfileResponse;
import com.haui.vtech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        UserEntity newProfile = convertToUserEntity(request);
        if (!userRepository.existsByEmail(request.getEmail())) {
            newProfile = userRepository.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Email đã  tồn tại");
    }

    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .id(newProfile.getId())
                .username(newProfile.getUsername())
                .email(newProfile.getEmail())
                .fullName(newProfile.getFullName())
                .phone(newProfile.getPhone())
                .avatar(newProfile.getAvatar())
                .status(newProfile.getStatus())
                .build();
    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .username(request.getUsername())
                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
                .password(request.getPassword())
                .build();
    }
}
