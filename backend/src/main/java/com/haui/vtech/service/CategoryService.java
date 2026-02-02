package com.haui.vtech.service;

import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;

import java.util.List;

public interface CategoryService {

    CategoryResponse create(CategoryCreateRequest request);

    List<CategoryResponse> findAll();

    CategoryResponse findById(String id);

    List<CategoryResponse> findByParentId(String id);

    CategoryResponse update(String id, CategoryUpdateRequest request);

    void delete(String id);

    void deleteSoft(String id);

    List<CategoryTreeResponse> getCategoryTree();

    List<CategoryResponse> findAllByStatus();
}
