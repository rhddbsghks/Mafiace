package com.ssafy.mafiace.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
    @ApiModelProperty(name="유저 아이디", example="ssafy")
    String userId;
    @ApiModelProperty(name="이전 비밀번호", example="1234")
    String beforePassword;
    @ApiModelProperty(name="비밀번호", example="1234")
    String password;
    @ApiModelProperty(name="이메일", example="ssafy@ssafy.com")
    String email;
    @ApiModelProperty(name="유저 닉네임", example="마피아짱")
    String nickname;
}
