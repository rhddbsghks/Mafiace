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

}
