package com.ssafy.mafiace.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("SessionOpenRequest")
public class SessionOpenReq {
    @ApiModelProperty(name="게임 방 이름")
    String gameTitle;

    @ApiModelProperty(name="공개여부")
    boolean isPublic;

    @ApiModelProperty(name="토론 시간")
    int discussionTime;

    @ApiModelProperty(name="최대 인원")
    int maxPlayer;

    @ApiModelProperty(name="비밀번호")
    String password;
}
