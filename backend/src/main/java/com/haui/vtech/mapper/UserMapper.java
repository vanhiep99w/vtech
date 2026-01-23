package com.haui.vtech.mapper;

import com.haui.vtech.entity.UserEntity;
import com.haui.vtech.io.user.ProfileUpdateResponse;
import com.haui.vtech.io.user.UserCreationRequest;
import com.haui.vtech.io.user.UserResponse;
import com.haui.vtech.io.user.ProfileUpdateRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(UserCreationRequest request);

    UserResponse toUserResponse(UserEntity userEntity);

    ProfileUpdateResponse toProfileUpdateResponse(UserEntity userEntity);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget UserEntity userEntity, ProfileUpdateRequest request);
}
