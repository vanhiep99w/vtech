package com.haui.vtech.service;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import com.haui.vtech.mapper.CategoryMapper;
import com.haui.vtech.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
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

}
