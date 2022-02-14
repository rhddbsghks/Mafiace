package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QGameLog;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameLogRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Autowired
    private GameLogRepository gameLogRepository;
    QGameLog qGameLog = QGameLog.gameLog;
    QUser qUser = QUser.user;

    public long[] getUserTotalRecord(User user){
        long[] returnArr = new long[3];
        List<UserGameLog> userGameLogList
            = user.getUserGameLogs();
        for(UserGameLog userGameLog : userGameLogList){
            if(userGameLog.isWin()) returnArr[0] +=1;
            else returnArr[1] +=1;
        }
        return returnArr;
    }

}
