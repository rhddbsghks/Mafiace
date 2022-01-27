package com.ssafy.mafiace.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody {
    @ApiModelProperty(name="JWT 인증 토큰", example="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0Iiw...")
    String accessToken;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken) {
        UserLoginPostRes res = new UserLoginPostRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}