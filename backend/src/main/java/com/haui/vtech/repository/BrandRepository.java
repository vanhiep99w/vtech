package com.haui.vtech.repository;

import com.haui.vtech.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    List<BrandEntity> findAllByStatusAndDeletedAtIsNotNullOrderByDeletedAtDesc(Integer status);

    Optional<BrandEntity> findByIdAndDeletedAtIsNotNull(String id);

    @Modifying
    @Query("""
        update BrandEntity b
        set b.status = 0,
            b.deletedAt = :deletedAt
        where b.id = :id
          and b.deletedAt is null
    """)
    int softDelete(
            @Param("id") String id,
            @Param("deletedAt") LocalDateTime deletedAt
    );

    @Modifying
    @Query("""
        update BrandEntity b
        set b.status = 1,
            b.deletedAt = null
        where b.id = :id
          and b.deletedAt is not null
    """)
    int restore(@Param("id") String id);
}
