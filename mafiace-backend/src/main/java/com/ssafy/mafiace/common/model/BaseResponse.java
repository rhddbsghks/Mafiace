package com.ssafy.mafiace.common.model;

import lombok.Getter;
import lombok.Setter;

// 서버 요청에 대한 기본 응답
@Getter
@Setter
public class BaseResponse {
    String message = null;
    Integer statusCode = null;  // int와 달리 nullable

    public BaseResponse() {}

    public BaseResponse(int statusCode) {
        this.statusCode = statusCode;
    }

    public BaseResponse(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public static BaseResponse of(int statusCode, String message) {
        BaseResponse body = new BaseResponse();
        body.statusCode = statusCode;
        body.message = message;
        return body;
    }
}
