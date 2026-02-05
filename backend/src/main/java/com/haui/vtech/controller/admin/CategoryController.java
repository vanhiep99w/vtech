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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/categories")
public class CategoryController extends BaseController {

    private final CategoryService categoryService;
    private final MessageUtil messageUtil;

    @PostMapping
    public ApiResponse<CategoryResponse> create(
            @Valid @ModelAttribute CategoryCreateRequest request,
            @RequestPart(required = false) MultipartFile thumbnail
    ) {
         return ApiResponse.<CategoryResponse>builder()
                 .data(categoryService.create(request, thumbnail))
                 .message(messageUtil.getMesage("created.success"))
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
                                                @Valid @ModelAttribute CategoryUpdateRequest request,
                                                @RequestPart(required = false) MultipartFile thumbnail) {
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryService.update(categoryId, request, thumbnail))
                .build();
    }

    @DeleteMapping("/{categoryId}")
    public ApiResponse<Void> delete(@PathVariable String categoryId) {
        categoryService.delete(categoryId);
        return ApiResponse.<Void>builder()
                .message(messageUtil.getMesage("deleted.success"))
                .build();
    }

    @GetMapping("/tree")
    public ApiResponse<List<CategoryTreeResponse>> getTree() {
        return ApiResponse.<List<CategoryTreeResponse>>builder()
                .data(categoryService.getCategoryTree())
                .build();
    }

}
