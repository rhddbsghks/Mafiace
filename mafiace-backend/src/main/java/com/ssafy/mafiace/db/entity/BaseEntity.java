package com.ssafy.mafiace.db.entity;

import java.nio.ByteBuffer;
import java.util.UUID;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * 모델 간 공통 사항 정의.
 */

// @MappedSuperclass : 객체의 입장에서 공통 매핑 정보가 필요할 때 사용
// 다른 Entity에 Extends 하여 사용하면 됨

@Getter
@Setter
@MappedSuperclass
public class BaseEntity {
    @Id @NotNull
    String id = shortUUID();

    public static String shortUUID() {
        UUID uuid = UUID.randomUUID();
        long l = ByteBuffer.wrap(uuid.toString().getBytes()).getLong();
        System.out.println(Long.toString(l,Character.MAX_RADIX));
        return Long.toString(l, Character.MAX_RADIX);
    }

}
