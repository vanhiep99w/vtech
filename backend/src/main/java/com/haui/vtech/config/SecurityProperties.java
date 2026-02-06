package com.haui.vtech.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "security.public")
@Getter
@Setter
public class SecurityProperties {
    private List<String> postEndpoints;
    private List<String> getEndpoints;
}
