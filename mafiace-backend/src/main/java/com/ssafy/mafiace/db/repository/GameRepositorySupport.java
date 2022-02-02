package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.QGame;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserRecords;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameRepositorySupport {

    private JPAQueryFactory jpaQueryFactory;

    public GameRepositorySupport(
        JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Game> findGameByOption(int maxPlayer, int isPublic) {
        QGame qGame = QGame.game;

        List<Game> list;

        if (isPublic == 0) {
            return jpaQueryFactory.selectFrom(qGame).where(qGame.maxPlayer.loe(maxPlayer)).fetch();
        }

        return jpaQueryFactory.selectFrom(qGame)
            .where(qGame.maxPlayer.loe(maxPlayer), qGame.isPublic.eq(isPublic == 1)).fetch();
    }
}
