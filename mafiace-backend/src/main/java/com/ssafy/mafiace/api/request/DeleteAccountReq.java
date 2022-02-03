package com.ssafy.mafiace.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DeleteAccountReq")
public class DeleteAccountReq {
    @ApiModelProperty(name="유저 아이디", example="ssafy")
    String userId;
    @ApiModelProperty(name="비밀번호", example="1234")
    String password;
}
