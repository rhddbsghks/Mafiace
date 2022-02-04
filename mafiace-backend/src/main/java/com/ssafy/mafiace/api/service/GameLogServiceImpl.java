package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.GameLogRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import java.util.Map;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class GameLogServiceImpl implements GameLogService {

    private GameLogRepository gameLogRepository;

    private UserRecordsRepository userRecordsRepository;
    private UserRecordsRepositorySupport userRecordsRepositorySupport;

    private UserRepository userRepository;

//    @Override
    public GameLog addGameLog(Map<String, String> gameLogResult) {
//        GameLog gameLog = GameLog.builder()
//            .playTime(gameLogResult의 끝난시간 - 시작시간)
//            .winTeam(gameLogResult.이긴 팀)
//            .build();
//        UserRecords userRecords = userRecordsRepositorySupport.updateUserRecords(gameLogResult);
//
//        return gameLogRepository.save(gameLog);
//
        return null;
    }
}
