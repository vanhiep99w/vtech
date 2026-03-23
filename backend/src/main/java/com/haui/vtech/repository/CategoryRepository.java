package com.haui.vtech.repository;

import com.haui.vtech.entity.CategoryEntity;
import com.haui.vtech.enums.CategoryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, String> {
    boolean existsByCategoryName(String categoryName);

    boolean existsBySlug(String slug);

    boolean existsById(String id);

    boolean existsByParentId(String parentId);

    CategoryEntity findByCategoryName(String categoryName);

    List<CategoryEntity> findByParentId(String parentId);

    Optional<CategoryEntity> findBySlug(String slug);

    List<CategoryEntity> findAllByStatus(CategoryStatus status);
}
