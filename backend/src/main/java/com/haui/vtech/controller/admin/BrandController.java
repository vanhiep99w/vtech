package com.haui.vtech.controller.admin;

import com.haui.vtech.controller.BaseController;
import com.haui.vtech.io.ApiResponse;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.service.BrandService;
import com.haui.vtech.util.MessageUtil;
import lombok.RequiredArgsConstructor;
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
            @ModelAttribute BrandCreateRequest request,
            @RequestPart(required = false)MultipartFile brandLogo
    ) {
        return ApiResponse.<BrandResponse>builder()
                .data(brandService.create(request, brandLogo))
                .message(messageUtil.getMesage("created.success"))
                .build();
    }

    @GetMapping
    public ApiResponse<List<BrandResponse>> findAll() {
        return ApiResponse.<List<BrandResponse>>builder()
                .data(brandService.findAll())
                .build();
    }
}
