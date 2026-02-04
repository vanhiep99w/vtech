package com.haui.vtech.controller.admin;

import com.haui.vtech.controller.BaseController;
import com.haui.vtech.io.ApiResponse;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryTreeResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import com.haui.vtech.service.CategoryService;
import com.haui.vtech.util.MessageUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/categories")
public class CategoryController extends BaseController {

    private final CategoryService categoryService;
    private final MessageUtil messageUtil;

    @PostMapping
    public ApiResponse<CategoryResponse> create(@Valid @RequestBody CategoryCreateRequest request) {
         return ApiResponse.<CategoryResponse>builder()
                 .data(categoryService.create(request))
                 .build();
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAll() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryService.findAll())
                .build();
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> getById(@PathVariable String categoryId) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.findById(categoryId))
                .build();
    }

    @GetMapping("/parent/{parentId}")
    public ApiResponse<List<CategoryResponse>> getByParentId(@PathVariable String parentId) {
        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryService.findByParentId(parentId))
                .build();
    }

    @PutMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> update(@PathVariable String categoryId,
                                                @Valid @RequestBody CategoryUpdateRequest request) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.update(categoryId, request))
                .build();
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> delete(@PathVariable String categoryId) {
        categoryService.delete(categoryId);
        return ApiResponse.<Void>builder()
                .build();
    }

    @GetMapping("/tree")
    public ApiResponse<List<CategoryTreeResponse>> getTree() {
        return ApiResponse.<List<CategoryTreeResponse>>builder()
                .data(categoryService.getCategoryTree())
                .build();
    }

}
