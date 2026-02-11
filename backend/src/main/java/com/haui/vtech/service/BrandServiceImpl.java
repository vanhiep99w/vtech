package com.haui.vtech.service;

import com.haui.vtech.entity.BrandEntity;
import com.haui.vtech.enums.ImageFolder;
import com.haui.vtech.exception.AppException;
import com.haui.vtech.exception.ErrorCode;
import com.haui.vtech.io.brand.BrandCreateRequest;
import com.haui.vtech.io.brand.BrandResponse;
import com.haui.vtech.io.brand.BrandUpdateRequest;
import com.haui.vtech.mapper.BrandMapper;
import com.haui.vtech.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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
            throw new AppException(ErrorCode.BRAND_SLUG_EXISTED, request.getSlug());
        }

        BrandEntity newBrand = brandMapper.toBrandEntity(request);

        if(brandLogo != null && !brandLogo.isEmpty()) {
            String brandUrl = s3Service.uploadImage(brandLogo, ImageFolder.BRAND);
            newBrand.setBrandLogo(brandUrl);
        }

        BrandEntity savedBrand = brandRepository.save(newBrand);
        return brandMapper.toBrandResponse(savedBrand);
    }

    @Override
    public List<BrandResponse> findAll() {
        return brandRepository.findByStatus(1).stream().map(brandMapper::toBrandResponse).toList();
    }

    @Override
    public BrandResponse findById(String id) {
        return brandMapper.toBrandResponse(brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, id)));
    }

    // TODO: delete this method after testing
    @Override
    public BrandResponse findBySlug(String slug) {
        return brandMapper.toBrandResponse(brandRepository.findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, slug)));
    }

    @Override
    public BrandResponse update(String id, BrandUpdateRequest request, MultipartFile brandLogo) {

        BrandEntity brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, id));

        if(!brand.getSlug().equals(request.getSlug())
                && brandRepository.existsBySlug(request.getSlug())) {
            throw new AppException(ErrorCode.BRAND_SLUG_EXISTED, request.getSlug());
        }

        if(brandLogo != null && !brandLogo.isEmpty()) {
            String brandLogoUrl = s3Service.uploadImage(brandLogo, ImageFolder.BRAND);
            brand.setBrandLogo(brandLogoUrl);
        }

        brandMapper.updateEntity(brand, request);

        return brandMapper.toBrandResponse(brandRepository.save(brand));
    }

    @Override
    public void delete(String id) {
        BrandEntity brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, id));

        brandRepository.delete(brand);
    }

    @Override
    public void deleteSoft(String id) {
        BrandEntity brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, id));

        if (brand.getDeletedAt() != null) {
            return;
        }

        brand.setStatus(0);
        brand.setDeletedAt(LocalDateTime.now());

        brandRepository.save(brand);
    }

    @Override
    public List<BrandResponse> getAllInTrash() {
        return brandRepository.findAllByStatusAndDeletedAtIsNotNullOrderByDeletedAtDesc(0)
                .stream().map(brandMapper::toBrandResponse).toList();
    }

    @Override
    public void restore(String id) {
        BrandEntity brand = brandRepository.findByIdAndDeletedAtIsNotNull(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND, id));

        brand.setStatus(1);
        brand.setDeletedAt(null);

        brandRepository.save(brand);
    }


}
