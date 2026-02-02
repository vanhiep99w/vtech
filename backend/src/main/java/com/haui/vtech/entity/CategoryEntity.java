package com.haui.vtech.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "categories")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryEntity extends BaseEntity{

    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "slug", nullable = false, length = 100, unique = true)
    private String slug;

    @Column(name = "category_desc", length = 255)
    private String categoryDesc;

    @Column(name = "thumbnail_url", length = 500)
    private String thumbnailUrl;

    @Column(name = "parent_id",  length = 36)
    private String parentId;

    @Column(name = "display_order")
    private Integer displayOrder;

}
