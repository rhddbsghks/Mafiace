package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.db.entity.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameInfo {

    Game game;
    int participantCount;

    public static GameInfo of( Game game, int participantCount) {
        GameInfo info = new GameInfo();
        info.setGame(game);
        info.setParticipantCount(participantCount);

        return info;
    }
}
