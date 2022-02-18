package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

// 얻은 명예리스트
@Getter
@Setter
public class HonorBody {
    private String Honors;

    public HonorBody(String honor) {
        this.Honors = honor;
    }

}
