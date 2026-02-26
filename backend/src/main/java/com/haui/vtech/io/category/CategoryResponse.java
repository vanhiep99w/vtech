package com.haui.vtech.io.category;

import com.haui.vtech.enums.CategoryStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CategoryResponse {
    private String id;
    private String categoryName;
    private String slug;
    private String categoryDesc;
    private String thumbnailUrl;
    private String parentId;
    private String parentName;
    private Integer displayOrder;
    private CategoryStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
