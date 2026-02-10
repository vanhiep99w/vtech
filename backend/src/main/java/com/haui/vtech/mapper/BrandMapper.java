package com.haui.vtech.mapper;

import com.haui.vtech.entity.BrandEntity;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.io.brand.BrandUpdateRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandEntity toBrandEntity(BrandCreateRequest request);

    BrandResponse toBrandResponse(BrandEntity entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget BrandEntity entity, BrandUpdateRequest request);
}
