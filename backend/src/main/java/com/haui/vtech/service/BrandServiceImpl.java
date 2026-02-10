package com.haui.vtech.service;

import com.haui.vtech.entity.BrandEntity;
import com.haui.vtech.enums.ImageFolder;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.mapper.BrandMapper;
import com.haui.vtech.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    private final S3Service s3Service;

    @Override
    public BrandResponse create(BrandCreateRequest request, MultipartFile brandLogo) {

        if(brandRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.BRAND_SLUG_EXISTED);
        }

        BrandEntity newBrand = brandMapper.toBrandEntity(request);

        if(brandLogo != null && !brandLogo.isEmpty()) {
            String brandUrrl = s3Service.uploadImage(brandLogo, ImageFolder.BRAND);
            newBrand.setBrandLogo(brandUrrl);
        }

        BrandEntity savedBrand = brandRepository.save(newBrand);
        return brandMapper.toBrandResponse(savedBrand);
    }

    @Override
    public List<BrandResponse> findAll() {
        return brandRepository.findAll().stream().map(brandMapper::toBrandResponse).toList();
    }
}
