package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.repository.UserGameLogRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserGameLogServiceImpl implements UserGameLogService{

    @Autowired
    private UserGameLogRepositorySupport userGameLogRepositorySupport;

    @Override
    public UserGameLog saveUserGameLog(GameLog gameLog, User user, String roleName, String winTeam) {
        return userGameLogRepositorySupport.saveUserGameLog(gameLog, user, roleName, winTeam);
    }
}
