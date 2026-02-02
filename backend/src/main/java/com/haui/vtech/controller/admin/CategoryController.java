package com.haui.vtech.controller.admin;

import com.haui.vtech.controller.BaseController;
import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.io.ApiResponse;
import com.haui.vtech.io.category.CategoryCreateRequest;
import com.haui.vtech.io.category.CategoryResponse;
import com.haui.vtech.io.category.CategoryUpdateRequest;
import com.haui.vtech.repository.CategoryRepository;
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
         ApiResponse<CategoryResponse> apiResponse = new ApiResponse<>();
         apiResponse.setData(categoryService.create(request));
         apiResponse.setMessage(messageUtil.getMesage("created.success"));
         return apiResponse;
    }

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getAll() {
        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryService.findAll())
                .build();
    }

    @GetMapping("/{categoryId}")
    public ApiResponse<CategoryResponse> getById(@PathVariable String categoryId) {
        ApiResponse<CategoryResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.findById(categoryId));
        return apiResponse;
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
        ApiResponse<CategoryResponse> apiResponse = new ApiResponse<>();
        apiResponse.setData(categoryService.update(categoryId, request));
        apiResponse.setMessage(messageUtil.getMesage("updated.success"));
        return apiResponse;
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> delete(@PathVariable String categoryId) {
        categoryService.delete(categoryId);
        return ApiResponse.<Void>builder()
                .message(messageUtil.getMesage("deleted.success"))
                .build();
    }
}
