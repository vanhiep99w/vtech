package com.haui.vtech.mapper;

import com.haui.vtech.entity.BrandEntity;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BrandMapper {

    BrandEntity toBrandEntity(BrandCreateRequest request);

    BrandResponse toBrandResponse(BrandEntity entity);

}
