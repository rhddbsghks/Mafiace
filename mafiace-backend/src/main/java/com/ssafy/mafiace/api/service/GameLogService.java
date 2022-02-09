package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.UserGameLog;
import java.util.Map;

public interface GameLogService {
    GameLog addGameLog(Map<String, String> gameLogResult);
}
