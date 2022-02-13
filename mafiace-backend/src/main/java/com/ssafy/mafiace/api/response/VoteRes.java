package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteRes {
    private String nickname;   // 가장 높은 표를 얻어서 최종적으로 선정된 사람
    private String check;   // 분기용

    public VoteRes(){
        this.check="nobody";
    }
}
