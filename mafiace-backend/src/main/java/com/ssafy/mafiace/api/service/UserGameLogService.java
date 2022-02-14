package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import java.util.List;

public interface UserGameLogService {

    public UserGameLog saveUserGameLog(GameLog gameLog, User user, String playTime,
        String role, boolean isWin);
    public List<UserGameLog> getUserGameLogs(String id);

}
