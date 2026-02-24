package com.haui.vtech.schedule;

import com.haui.vtech.entity.BrandEntity;
import com.haui.vtech.enums.BrandStatus;
import com.haui.vtech.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class BrandCleanupScheduler {

    private final BrandRepository brandRepository;

    @Value("${cleanup-data.expire-minutes}")
    private long expireMinutes;

    @Scheduled(fixedRateString = "${cleanup-data.cleanup-rate-ms}")
    public void cleanupSoftDeletedBrands() {

        LocalDateTime expiredTime = LocalDateTime.now().minusMinutes(expireMinutes);

        List<BrandEntity> expiredBrands =
                brandRepository.findAllByStatusAndDeletedAtBefore(BrandStatus.INACTIVE, expiredTime);

        if (!expiredBrands.isEmpty()) {
            brandRepository.deleteAll(expiredBrands);
            log.info("Hard deleted {} expired brands", expiredBrands.size());
        }
    }
}
