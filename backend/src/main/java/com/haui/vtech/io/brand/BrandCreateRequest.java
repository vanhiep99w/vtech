package com.haui.vtech.io.brand;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandCreateRequest {

    private String brandName;

    private String slug;

    private String brandDesc;

    private Integer displayOrder;
}
