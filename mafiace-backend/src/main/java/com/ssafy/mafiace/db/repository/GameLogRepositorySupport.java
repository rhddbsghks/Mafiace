package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QGameLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameLogRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QGameLog qGameLog = QGameLog.gameLog;

}
