package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.common.model.NewSessionInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SessionTokenPostResponse")
public class SessionTokenPostRes extends BaseResponseBody {
    @ApiModelProperty(name="세션방 토큰", example="wss://i6a602.p.ssafy.io?sessionId=ses_Qy2cC5ghva&token=tok_ZfUzj1Ne6YMB6ver")
    NewSessionInfo newSessionInfo;

    public static SessionTokenPostRes of(Integer statusCode, String message, NewSessionInfo newSessionInfo) {
        SessionTokenPostRes res = new SessionTokenPostRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setNewSessionInfo(newSessionInfo);
        return res;
    }
}
