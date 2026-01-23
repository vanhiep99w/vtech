package com.haui.vtech.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "invalid_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvalidatedToken {

    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @Column(name = "expiry_time", nullable = false)
    private Date expiryTime;
}
