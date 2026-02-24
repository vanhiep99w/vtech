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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final BrandMapper brandMapper;
    private final S3Service s3Service;

    @Override
    public BrandResponse create(BrandCreateRequest request, MultipartFile brandLogo) {
        log.info("Create brand started | request={}", request);

        if(brandRepository.existsBySlug(request.getSlug())) {
            log.warn("Create brand failed | slug existed={}", request.getSlug());
            throw new AppException(ErrorCode.BRAND_SLUG_EXISTED, request.getSlug());
        }

        BrandEntity newBrand = brandMapper.toBrandEntity(request);

        if(!ObjectUtils.isEmpty(brandLogo)) {
            String brandUrl = s3Service.uploadImage(brandLogo, ImageFolder.BRAND);
            newBrand.setBrandLogo(brandUrl);
        }

        BrandEntity savedBrand = brandRepository.save(newBrand);

        log.info("Create brand success | id={}", savedBrand.getId());
        return brandMapper.toBrandResponse(savedBrand);
    }

    @Override
    public List<BrandResponse> findAll() {
        log.info("Find all brands started");

        return brandRepository.findByStatus(1).stream().map(brandMapper::toBrandResponse).toList();
    }

    @Override
    public BrandResponse findById(String id) {
        log.info("Find brand by id started | id={}", id);

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
        log.info("Update brand started | id={}, request={}", id, request);

        BrandEntity brand = brandRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Brand not found | id={}", id);
                    return new AppException(ErrorCode.BRAND_NOT_FOUND, id);
                });

        if(!brand.getSlug().equals(request.getSlug())
                && brandRepository.existsBySlug(request.getSlug())) {
            log.warn("Update brand failed | slug existed={}", request.getSlug());
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
        log.info("Delete brand started | id={}", id);
        BrandEntity brand = brandRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Delete brand failed | not found | id={}", id);
                    return new AppException(ErrorCode.BRAND_NOT_FOUND, id);
                });

        brandRepository.delete(brand);
        log.info("Delete brand success | id={}", id);
    }

    @Override
    @Transactional
    public void deleteSoft(String id) {
        log.info("Soft delete brand started | id={}", id);
        int affectedRows  = brandRepository.softDelete(id, LocalDateTime.now());

        if (affectedRows  == 0) {
            log.warn("Soft delete brand failed | not found | id={}", id);
            throw new AppException(ErrorCode.BRAND_NOT_FOUND, id);
        }
        log.info("Soft delete brand success | id={}", id);
    }

    @Override
    public List<BrandResponse> getAllInTrash() {
        log.info("Get brands in trash started");
        return brandRepository.findAllByStatusAndDeletedAtIsNotNullOrderByDeletedAtDesc(0)
                .stream().map(brandMapper::toBrandResponse).toList();
    }

    @Override
    @Transactional
    public void restore(String id) {
        log.info("Restore brand started | id={}", id);

        int affectedRows = brandRepository.restore(id);

        if (affectedRows == 0) {
            log.warn("Restore brand failed | not found | id={}", id);
            throw new AppException(ErrorCode.BRAND_NOT_FOUND, id);
        }
        log.info("Restore brand success | id={}", id);
    }

}
