package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostRes extends BaseResponseBody {
    String accessToken;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken) {
        UserLoginPostRes res = new UserLoginPostRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}