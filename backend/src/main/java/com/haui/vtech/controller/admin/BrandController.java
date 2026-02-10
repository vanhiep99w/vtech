package com.haui.vtech.controller.admin;

import com.haui.vtech.controller.BaseController;
import com.haui.vtech.io.ApiResponse;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.io.brand.BrandUpdateRequest;
import com.haui.vtech.service.BrandService;
import com.haui.vtech.util.MessageUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/brands")
public class BrandController extends BaseController {

    private final BrandService brandService;
    private final MessageUtil messageUtil;

    @PostMapping
    public ApiResponse<BrandResponse> createBrand(
            @Valid @ModelAttribute BrandCreateRequest request,
            @RequestPart(required = false) MultipartFile brandLogo
    ) {
        return ApiResponse.<BrandResponse>builder()
                .data(brandService.create(request, brandLogo))
                .message(messageUtil.getMesage("created.success"))
                .build();
    }

    @GetMapping
    public ApiResponse<List<BrandResponse>> getAll() {
        return ApiResponse.<List<BrandResponse>>builder()
                .data(brandService.findAll())
                .build();
    }

    @GetMapping("/{brandId}")
    public ApiResponse<BrandResponse> getById(@PathVariable String brandId) {
        return ApiResponse.<BrandResponse>builder()
                .data(brandService.findById(brandId))
                .build();
    }

    // TODO: delete this endpoint after testing
    @GetMapping("/slug/{slug}")
    public ApiResponse<BrandResponse> getBySlug(@PathVariable String slug) {
        return ApiResponse.<BrandResponse>builder()
                .data(brandService.findBySlug(slug))
                .build();
    }

    @PutMapping("/{brandId}")
    public ApiResponse<BrandResponse> updateBrand(@PathVariable String brandId,
                                                  @Valid @ModelAttribute BrandUpdateRequest request,
                                                  @RequestPart(required = false) MultipartFile brandLogo) {
        return ApiResponse.<BrandResponse>builder()
                .data(brandService.update(brandId, request, brandLogo))
                .message(messageUtil.getMesage("updated.success"))
                .build();
    }

    @DeleteMapping("/{brandId}")
    public ApiResponse<Void> deleteBrand(@PathVariable String brandId) {
        brandService.delete(brandId);
        return ApiResponse.<Void>builder()
                .message(messageUtil.getMesage("deleted.success"))
                .build();
    }
}
