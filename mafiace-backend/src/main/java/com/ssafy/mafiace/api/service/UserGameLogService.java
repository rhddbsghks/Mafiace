package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;

public interface UserGameLogService {

    public UserGameLog saveUserGameLog(GameLog gameLog, User user, String roleName, boolean isWin);

}
