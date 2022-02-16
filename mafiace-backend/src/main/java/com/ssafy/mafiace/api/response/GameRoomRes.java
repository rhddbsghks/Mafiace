package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.common.model.GameInfo;
import com.ssafy.mafiace.db.entity.Game;
import io.swagger.annotations.ApiModel;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameRoomGetRes")
public class GameRoomRes extends BaseResponseBody{

    List<GameInfo> list;

    public static GameRoomRes of(int statusCode,String message, List<GameInfo> list) {
        GameRoomRes res = new GameRoomRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setList(list);
        return res;
    }
}
