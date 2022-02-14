package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.repository.GameLogRepository;
import com.ssafy.mafiace.db.repository.GameLogRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameLogServiceImpl implements GameLogService {

    @Autowired
    private GameLogRepository gameLogRepository;

    @Autowired
    private UserRecordsRepository userRecordsRepository;

    @Autowired
    private UserRecordsRepositorySupport userRecordsRepositorySupport;

    @Autowired
    private UserRepository userRepository;


    @Override
    public GameLog addGameLog(String playTime, String winTeam) {
        // gameLog (playtime, winTeam, game_log_id)
        GameLog gameLog = GameLog.builder()
            .playTime(playTime)
            .winTeam(winTeam)
            .build();
        return gameLogRepository.save(gameLog);
    }

}
