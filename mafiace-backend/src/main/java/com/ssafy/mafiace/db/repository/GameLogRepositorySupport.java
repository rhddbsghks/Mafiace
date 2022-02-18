package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QGameLog;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserGameLog;
import com.ssafy.mafiace.db.entity.UserGameLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameLogRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Autowired
    private GameLogRepository gameLogRepository;

    QGameLog qGameLog = QGameLog.gameLog;
    QUserGameLog qUserGameLog = QUserGameLog.userGameLog;
    QUser qUser = QUser.user;

    public String getPlayTimeByGameLog(UserGameLog userGameLog) {
        return this.jpaQueryFactory
            .select(qGameLog.playTime)
            .from(qGameLog)
            .where(qGameLog.id.eq(userGameLog.getGameLog().getId()))
            .fetchOne();
    }
}
