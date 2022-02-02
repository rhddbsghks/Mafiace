package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.Notice;
import io.swagger.annotations.ApiModel;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameRoomGetRes")
public class GameRoomRes extends BaseResponseBody{

    int count;
    List<Game> list;

    public static GameRoomRes of(int statusCode,String message,int count, List<Game> list) {
        GameRoomRes res = new GameRoomRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setList(list);
        res.setCount(count);
        return res;
    }
}
