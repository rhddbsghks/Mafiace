package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteRes {
    String nickname;   // 가장 높은 표를 얻어서 최종적으로 선정된 사람
    String check;   // 분기용
}
