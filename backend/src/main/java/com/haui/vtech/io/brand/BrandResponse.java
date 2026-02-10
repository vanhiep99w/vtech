package com.haui.vtech.io.brand;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BrandResponse {
    private String id;
    private String brandName;
    private String slug;
    private String brandDesc;
    private String brandLogo;
    private Integer displayOrder;
    private Integer status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
