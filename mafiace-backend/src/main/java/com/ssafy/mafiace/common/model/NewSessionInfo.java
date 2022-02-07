package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.api.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("NewSessionInfo")
public class NewSessionInfo {

    String token;
    String gameId;

    public static NewSessionInfo of(String token, String gameId) {
        NewSessionInfo info = new NewSessionInfo();
        info.setToken(token);
        info.setGameId(gameId);

        return info;
    }
}
