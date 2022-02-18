package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.QGame;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class GameRepositorySupport {

    private JPAQueryFactory jpaQueryFactory;

    @Autowired
    private GameRepository gameRepository;

    public GameRepositorySupport(
        JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public List<Game> findGameByOption(int maxPlayer, int isPublic) {
        QGame qGame = QGame.game;

        if (isPublic == 0) {
            return jpaQueryFactory.selectFrom(qGame)
                .where(qGame.maxPlayer.loe(maxPlayer))
                .orderBy(qGame.isActive.asc(), qGame.roomNum.desc()).fetch();
        }

        return jpaQueryFactory.selectFrom(qGame)
            .where(qGame.maxPlayer.loe(maxPlayer),
                qGame.isPublic.eq(isPublic == 1)).orderBy(qGame.isActive.asc(),  qGame.roomNum.desc()).fetch();
    }

    public Game findById(String gameId) {
        QGame qGame = QGame.game;

        return jpaQueryFactory.selectFrom(qGame).where(qGame.id.eq(gameId)).fetchOne();
    }

    public int findMaxPlayerById(String gameId) {
        QGame qGame = QGame.game;
        return jpaQueryFactory.select(qGame.maxPlayer).from(qGame).where(qGame.id.eq(gameId)).fetchOne();
    }

    public void updateOwnerId(String gameId ,String userId){
        Game game = gameRepository.findGameById(gameId);
        game.updateOwnerId(userId);
        gameRepository.save(game);
    }
}
