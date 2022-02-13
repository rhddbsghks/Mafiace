package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserGameLogRepositorySupport {

    @Autowired
    private UserGameLogRepository userGameLogRepository;

    public UserGameLog saveUserGameLog(GameLog gameLog, User user, String roleName, String winTeam){
        String team = roleName.equals("Mafia") ? "Mafia" : "Citizen";
        UserGameLog userGameLog = UserGameLog.builder()
            .roleName(roleName)
            .isWin(team.equals(winTeam))
            .user(user)
            .gameLog(gameLog)
            .build();
        return userGameLogRepository.save(userGameLog);
    }

}
