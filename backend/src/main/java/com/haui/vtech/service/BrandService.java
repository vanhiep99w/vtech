package com.haui.vtech.service;

import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BrandService {

    BrandResponse create(BrandCreateRequest request, MultipartFile brandLogo);

    List<BrandResponse> findAll();

}
