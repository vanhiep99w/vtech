package com.haui.vtech.service;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import com.haui.vtech.mapper.CategoryMapper;
import com.haui.vtech.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public CategoryResponse create(CategoryCreateRequest request) {
        if(categoryRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.CATEGORY_SLUG_EXISTED);
        }
        if(request.getParentId() != null && !categoryRepository.existsById(request.getParentId())){
            throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND);
        }
        CategoryEntity newCategory = categoryMapper.toEntity(request);
        CategoryEntity savedCategory = categoryRepository.save(newCategory);
        return categoryMapper.toResponse(savedCategory);
    }

    @Override
    public List<CategoryResponse> findAll() {
        List<CategoryEntity> categories = categoryRepository.findAll();

        Map<String, String> categoryNameMap = categories.stream()
                .collect(Collectors.toMap(
                        CategoryEntity::getId,
                        CategoryEntity::getCategoryName
                ));

        return categories.stream().map(category -> {
            CategoryResponse response = categoryMapper.toResponse(category);

            if (category.getParentId() != null) {
                response.setParentName(
                        categoryNameMap.get(category.getParentId())
                );
            }

            return response;
        }).toList();
    }

    @Override
    public CategoryResponse findById(String id) {
        return categoryMapper.toResponse(categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND)));
    }

    @Override
    public List<CategoryResponse> findByParentId(String id) {
        if(!categoryRepository.existsById(id)){
            throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND);
        }
        return categoryRepository.findByParentId(id).stream().map(categoryMapper::toResponse).toList();
    }

    @Override
    public CategoryResponse update(String id, CategoryUpdateRequest request) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        // Validate slug uniqueness
        if (!category.getSlug().equals(request.getSlug())
                && categoryRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.CATEGORY_SLUG_EXISTED);
        }

        // Validate parent category
        if (request.getParentId() != null) {
            if (!categoryRepository.existsById(request.getParentId())) {
                throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND);
            }

            if (request.getParentId().equals(id)) {
                throw new AppException(ErrorCode.CATEGORY_PARENT_INVALID);
            }

            category.setParentId(request.getParentId());
        } else {
            category.setParentId(null);
        }

        categoryMapper.updateEntity(category, request);

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public void delete(String id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        if (categoryRepository.existsByParentId(id)) {
            throw new AppException(ErrorCode.CATEGORY_HAS_CHILD);
        }

        categoryRepository.deleteById(id);
    }

    @Override
    public void deleteSoft(String id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));

        if (categoryRepository.existsByParentId(id)) {
            throw new AppException(ErrorCode.CATEGORY_HAS_CHILD);
        }
        category.setStatus(0);
        categoryRepository.save(category);
    }

    @Override
    public List<CategoryResponse> findAllByStatus() {
        return categoryRepository.findAllByStatus(1).stream().map(categoryMapper::toResponse).toList();
    }

    @Override
    public List<CategoryTreeResponse> getCategoryTree() {
        List<CategoryEntity> categories = categoryRepository.findAll();

        Map<String, CategoryTreeResponse> map = new HashMap<>();

        for (CategoryEntity category : categories) {
            map.put(category.getId(),
                    CategoryTreeResponse.builder()
                            .id(category.getId())
                            .categoryName(category.getCategoryName())
                            .slug(category.getSlug())
                            .categoryDesc(category.getCategoryDesc())
                            .thumbnailUrl(category.getThumbnailUrl())
                            .displayOrder(category.getDisplayOrder())
                            .children(new ArrayList<>())
                            .build()
            );
        }

        List<CategoryTreeResponse> roots = new ArrayList<>();

        for (CategoryEntity category : categories) {
            if (category.getParentId() == null) {
                roots.add(map.get(category.getId()));
            } else {
                CategoryTreeResponse parent = map.get(category.getParentId());
                if (parent != null) {
                    parent.getChildren().add(map.get(category.getId()));
                }
            }
        }

        return roots;
    }



}
