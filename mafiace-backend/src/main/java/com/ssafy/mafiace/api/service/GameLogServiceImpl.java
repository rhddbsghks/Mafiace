package com.ssafy.mafiace.api.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.QGameLog;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.repository.GameLogRepository;
import com.ssafy.mafiace.db.repository.GameLogRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameLogServiceImpl implements GameLogService {

    @Autowired
    private GameLogRepository gameLogRepository;

    @Autowired
    private GameLogRepositorySupport gameLogRepositorySupport;

    @Autowired
    private UserRecordsRepository userRecordsRepository;

    @Autowired
    private UserRecordsRepositorySupport userRecordsRepositorySupport;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QGameLog qGameLog = QGameLog.gameLog;
    private QUser qUser = QUser.user;


    @Override
    public GameLog addGameLog(String playTime, String winTeam) {
        // gameLog (playtime, winTeam, game_log_id)
        GameLog gameLog = GameLog.builder()
            .playTime(playTime)
            .winTeam(winTeam)
            .build();
        return gameLogRepository.save(gameLog);
    }

    @Override
    public String getPlayTimeByGameLog(UserGameLog userGameLog) {
        return gameLogRepositorySupport.getPlayTimeByGameLog(userGameLog);
    }

}
