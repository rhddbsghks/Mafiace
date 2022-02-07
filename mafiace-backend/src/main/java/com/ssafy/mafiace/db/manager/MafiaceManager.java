package com.ssafy.mafiace.db.manager;


import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.Getter;
import lombok.Setter;
import org.apache.tomcat.jni.Local;
import org.hibernate.annotations.CreationTimestamp;

@Getter
@Setter
public class MafiaceManager {

    private GameRepository gameRepository;

    private GameService gameService;

    private UserRepository userRepository;

    // 게임 내에 사용되는 내부 로직

    private String gameId;
    private String roomNum;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private GamePlayerRes players;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winTeam;
    private SessionService sessionService;
    public MafiaceManager() {}

    // 게임 시작할때 생성자 호출
    public MafiaceManager(String gameId, SessionService sessionService){ // GameService 추가해야함
        this.gameId = gameId;
        this.room = gameRepository.findGameById(gameId);
        this.sessionService = sessionService;
        this.userList = gameService.getUserListById(gameId);
        players = new GamePlayerRes(userList);
        room.setRoomStatus(true);

//      룰 분배, votemanager 생성필요
    }


    public UserRecordsRepositorySupport userRecordsRepositorySupport;
    public UserRecordsRepository userRecordsRepository;
    public GameLogService gameLogService;
    // 게임 종료
    public boolean saveRecord(){
        endTime = LocalDateTime.now();
        Duration duration = Duration.between(startTime, endTime);
        List<Map<String, String>> GameLogs = players.makeGameLog();
        for(Map<String, String> gameLog : GameLogs){
            // GameLog로 저장할 것과 userRecords로 저장할것 나눠서 저장
            // Update or Save .
            gameLog.put("winTeam",winTeam);
            gameLog.put("playTime",String.valueOf(duration));
            Optional<User> user = userRepository.findByUserId(gameLog.get("userId"));
            if(user == null) return false;
            gameLogService.addGameLog(gameLog);
            userRecordsRepositorySupport.updateUserRecords(gameLog);
        }

        gameRepository.deleteById(room.getId());
        return true;
    }


}
