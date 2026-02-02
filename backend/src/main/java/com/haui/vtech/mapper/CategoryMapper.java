package com.haui.vtech.mapper;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryEntity toEntity(CategoryCreateRequest request);

    CategoryResponse toResponse(CategoryEntity entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget CategoryEntity entity, CategoryUpdateRequest request);
}
