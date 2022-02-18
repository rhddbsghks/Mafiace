package com.ssafy.mafiace.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BaseResponseBody")
public class BaseResponseBody {
    @ApiModelProperty(name="응답 메시지", example = "Success")
    String message = null;
    @ApiModelProperty(name="응답 코드", example = "200")
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