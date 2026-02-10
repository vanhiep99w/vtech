package com.haui.vtech.repository;

import com.haui.vtech.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, String> {

    boolean existsBySlug(String slug);
}
