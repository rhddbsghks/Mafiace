package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserGameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserGameLogRepositorySupport {

    @Autowired
    private UserGameLogRepository userGameLogRepository;

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QUser qUser = QUser.user;
    private QUserGameLog qUserGameLog = QUserGameLog.userGameLog;

    public UserGameLog saveUserGameLog(GameLog gameLog, User user,String playTime ,String roleName, boolean isWin){
        UserGameLog userGameLog = UserGameLog.builder()
            .roleName(roleName)
            .isWin(isWin)
            .playTime(playTime)
            .user(user)
            .gameLog(gameLog)
            .build();
        return userGameLogRepository.save(userGameLog);
    }

    public List<UserGameLog> getUserGameLogs(String id){
        return this.jpaQueryFactory.selectFrom(qUserGameLog)
            .where(qUserGameLog.user.id.eq(id))
            .orderBy(qUserGameLog.startTime.desc())
            .limit(10)
            .fetch();
    }

}
