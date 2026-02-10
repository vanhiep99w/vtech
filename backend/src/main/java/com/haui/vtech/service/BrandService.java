package com.haui.vtech.service;

import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.io.brand.BrandUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {

    BrandResponse create(BrandCreateRequest request, MultipartFile brandLogo);

    List<BrandResponse> findAll();

    BrandResponse findById(String id);

    // TODO: delete this method after testing
    BrandResponse findBySlug(String slug);

    BrandResponse update(String id, BrandUpdateRequest request, MultipartFile brandLogo);

    void delete(String id);

    void deleteSoft(String id);

    List<BrandResponse> getAllInTrash();

    void restore(String id);
}
