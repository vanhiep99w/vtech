package com.haui.vtech.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Entity
@Table(name = "brands")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class BrandEntity extends BaseEntity {

    @Column(name = "brand_name", nullable = false, length = 50)
    private String brandName;

    @Column(name = "slug", nullable = false, length = 50, unique = true)
    private String slug;

    @Column(name = "brand_desc", length = 255)
    private String brandDesc;

    @Column(name = "brand_logo", length = 255)
    private String brandLogo;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

}
