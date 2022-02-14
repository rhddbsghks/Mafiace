package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.UserGameLog;

public interface GameLogService {

    GameLog addGameLog(String playTime, String winTeam);

    String getPlayTimeByGameLog(UserGameLog id);
}
