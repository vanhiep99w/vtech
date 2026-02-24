package com.haui.vtech.service;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.enums.ImageFolder;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import com.haui.vtech.mapper.CategoryMapper;
import com.haui.vtech.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final S3Service s3Service;

    @Override
    public CategoryResponse create(CategoryCreateRequest request, MultipartFile thumbnail) {
        log.info("Create category started | request={}", request);

        if(categoryRepository.existsBySlug(request.getSlug())) {
            log.warn("Create category failed | slug existed={}", request.getSlug());
            throw new AppException(ErrorCode.CATEGORY_SLUG_EXISTED, request.getSlug());
        }

        if(request.getParentId() != null && !categoryRepository.existsById(request.getParentId())){
            log.warn("Create category failed | parent not found={}", request.getParentId());
            throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND, request.getParentId());
        }
        CategoryEntity newCategory = categoryMapper.toEntity(request);

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String imageUrl = s3Service.uploadImage(thumbnail, ImageFolder.CATEGORY);
            newCategory.setThumbnailUrl(imageUrl);
        }

        CategoryEntity savedCategory = categoryRepository.save(newCategory);

        log.info("Create category success | id={}", savedCategory.getId());
        return categoryMapper.toResponse(savedCategory);
    }

    @Override
    public List<CategoryResponse> findAll() {
        log.info("Find all categories started");

        List<CategoryEntity> categories = categoryRepository.findAll();
        log.info("Find all categories | total={}", categories.size());

        Map<String, String> categoryNameMap = categories.stream()
                .collect(Collectors.toMap(CategoryEntity::getId, CategoryEntity::getCategoryName));

        return categories.stream().map(category -> {
            CategoryResponse response = categoryMapper.toResponse(category);
            if (category.getParentId() != null) {
                response.setParentName(categoryNameMap.get(category.getParentId()));
            }
            return response;
        }).toList();
    }


    @Override
    public CategoryResponse findById(String id) {
        log.info("Find category by id started | id={}", id);

        CategoryResponse response = categoryMapper.toResponse(
                categoryRepository.findById(id)
                        .orElseThrow(() -> {
                            log.warn("Category not found | id={}", id);
                            return new AppException(ErrorCode.CATEGORY_NOT_FOUND, id);
                        })
        );

        log.info("Find category by id success | id={}", id);
        return response;
    }

    @Override
    public List<CategoryResponse> findByParentId(String id) {
        if(!categoryRepository.existsById(id)){
            throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND);
        }
        return categoryRepository.findByParentId(id).stream().map(categoryMapper::toResponse).toList();
    }

    @Override
    public CategoryResponse update(String id, CategoryUpdateRequest request, MultipartFile thumbnail) {
        log.info("Update category started | id={}, request={}", id, request);
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Category not found | id={}", id);
                    return new AppException(ErrorCode.CATEGORY_NOT_FOUND, id);
                });

        // Validate slug uniqueness
        if (!category.getSlug().equals(request.getSlug())
                && categoryRepository.existsBySlug(request.getSlug())) {
            log.warn("Update category failed | slug existed={}", request.getSlug());
            throw new AppException(ErrorCode.CATEGORY_SLUG_EXISTED, request.getSlug());
        }

        // Validate parent category
        if (request.getParentId() != null) {
            if (!categoryRepository.existsById(request.getParentId())) {
                log.warn("Update category failed | parent not found | parentId={}", request.getParentId());
                throw new AppException(ErrorCode.CATEGORY_PARENT_NOT_FOUND);
            }

            if (request.getParentId().equals(id)) {
                log.warn("Update category failed | parent equals self | id={}", id);
                throw new AppException(ErrorCode.CATEGORY_PARENT_INVALID);
            }

            category.setParentId(request.getParentId());
            log.info("Update category parent success | id={}, newParentId={}", id, request.getParentId());
        } else {
            log.info("Remove category parent | id={}, oldParentId={}", id, category.getParentId());
            category.setParentId(null);
        }

        if (thumbnail != null && !thumbnail.isEmpty()) {
            String imageUrl = s3Service.uploadImage(thumbnail, ImageFolder.CATEGORY);
            category.setThumbnailUrl(imageUrl);
        }

        categoryMapper.updateEntity(category, request);

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public void delete(String id) {
        log.info("Delete category started | id={}", id);
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND, id));

        if (categoryRepository.existsByParentId(id)) {
            log.warn("Delete category failed | has child | id={}", id);
            throw new AppException(ErrorCode.CATEGORY_HAS_CHILD, category.getCategoryName());
        }

        categoryRepository.deleteById(id);
        log.info("Delete category success | id={}", id);
    }

    @Override
    public void deleteSoft(String id) {
        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND, id));

        if (categoryRepository.existsByParentId(id)) {
            throw new AppException(ErrorCode.CATEGORY_HAS_CHILD, category.getCategoryName());
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
        log.info("Get category tree started");

        List<CategoryEntity> categories = categoryRepository.findAll();
        log.info("Total categories loaded={}", categories.size());

        Map<String, CategoryTreeResponse> map = categories.stream()
                .collect(Collectors.toMap(
                        CategoryEntity::getId,
                        categoryMapper::toTreeResponse
                ));

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
        log.info("Get category tree success | rootCount={}", roots.size());
        return roots;
    }



}
