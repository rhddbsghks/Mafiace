package com.ssafy.mafiace.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponseBody {
    String message = null;
    Integer status = null;

    public BaseResponseBody() {
    }

    public BaseResponseBody(Integer statusCode) {
        this.status = statusCode;
    }

    public BaseResponseBody(Integer statusCode, String message) {
        this.status = statusCode;
        this.message = message;
    }

    public static BaseResponseBody of(Integer statusCode, String message) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.status = statusCode;
        return body;
    }
}