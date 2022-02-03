package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.QGame;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class GameRepositorySupport {

    private JPAQueryFactory jpaQueryFactory;

    public GameRepositorySupport(
        JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Game> findGameByOption(int minPlayer, int maxPlayer, int isPublic) {
        QGame qGame = QGame.game;

        if (isPublic == 0) {
            return jpaQueryFactory.selectFrom(qGame)
                .where(qGame.maxPlayer.goe(minPlayer), qGame.maxPlayer.loe(maxPlayer))
                .orderBy(qGame.roomNum.desc()).fetch();
        }

        return jpaQueryFactory.selectFrom(qGame)
            .where(qGame.maxPlayer.goe(minPlayer), qGame.maxPlayer.loe(maxPlayer),
                qGame.isPublic.eq(isPublic == 1)).orderBy(qGame.roomNum.desc()).fetch();
    }
}
