package com.haui.vtech.service;

import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryCreateRequest request, MultipartFile thumbnail);

    List<CategoryResponse> findAll();

    CategoryResponse findById(String id);

    List<CategoryResponse> findByParentId(String id);

    CategoryResponse update(String id, CategoryUpdateRequest request, MultipartFile thumbnail);

    void delete(String id);

    void deleteSoft(String id);

    List<CategoryTreeResponse> getCategoryTree();

    List<CategoryResponse> findAllByStatus();
}
