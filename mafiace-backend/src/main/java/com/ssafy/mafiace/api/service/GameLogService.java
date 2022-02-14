package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import java.util.Map;
import lombok.NoArgsConstructor;

public interface GameLogService {

    GameLog addGameLog(String playTime, String winTeam);
}
