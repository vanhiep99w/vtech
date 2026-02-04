package com.haui.vtech.mapper;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryEntity toEntity(CategoryCreateRequest request);

    CategoryResponse toResponse(CategoryEntity entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(@MappingTarget CategoryEntity entity, CategoryUpdateRequest request);

    @Mapping(target = "children", expression = "java(new java.util.ArrayList<>())")
    CategoryTreeResponse toTreeResponse(CategoryEntity entity);
}
