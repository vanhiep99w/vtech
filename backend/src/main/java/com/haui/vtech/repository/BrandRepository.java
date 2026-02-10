package com.haui.vtech.repository;

import com.haui.vtech.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, String> {

    boolean existsBySlug(String slug);

    Optional<BrandEntity> findBySlug(String slug);
}
