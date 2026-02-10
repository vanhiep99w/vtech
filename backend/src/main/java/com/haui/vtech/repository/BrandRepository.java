package com.haui.vtech.repository;

import com.haui.vtech.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, String> {

    boolean existsBySlug(String slug);

    Optional<BrandEntity> findBySlug(String slug);

    List<BrandEntity> findByStatus(Integer status);

    List<BrandEntity> findAllByStatusAndDeletedAtBefore(
            Integer status,
            LocalDateTime time
    );

//    List<BrandEntity> findAllByStatusAndDeletedAtIsNotNull(Integer status);
    List<BrandEntity> findAllByStatusAndDeletedAtIsNotNullOrderByDeletedAtDesc(Integer status);

    Optional<BrandEntity> findByIdAndDeletedAtIsNotNull(String id);
}
