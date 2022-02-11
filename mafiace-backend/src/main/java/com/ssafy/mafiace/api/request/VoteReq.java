package com.ssafy.mafiace.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoteReq {
    private String nickname;  // 투표자의 닉네임
    private String votedFor;  // 투표를 한 사람의 닉네임
    private String currentStage;  // 현재 진행 단계 (낮: day, 밤: night)

    public VoteReq() {}

    public VoteReq(String nickname, String votedFor) {
        this.nickname = nickname;
        this.votedFor = votedFor;
    }
}
