package com.ssafy.mafiace.common.model;


import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
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
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
public class MafiaceManager {



    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRecordsService userRecordsService;

    @Autowired
    public UserRecordsRepository userRecordsRepository;

    @Autowired
    public GameLogService gameLogService;

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
    private GameService gameService;
    public MafiaceManager() {}


    // 게임 시작할때 생성자 호출
    public MafiaceManager(String gameId, SessionService sessionService, GameService gameService){
        this.gameId = gameId;
        this.sessionService = sessionService;
        this.gameService = gameService;
        this.room = gameService.getGameById(gameId);
        this.userList = sessionService.getParticipantList(gameId); // roomId == gameId
        this.players = new GamePlayerRes(userList);
        this.room.setRoomStatus(true);
        players.setRole();
    }

    public void gameSet(){
        room.setRoomStatus(false);
    }



    // 게임 종료 후 Log 저장
    public boolean saveRecord(){
        endTime = LocalDateTime.now();
        Duration duration = Duration.between(this.startTime, this.endTime);
        System.err.println(duration);
        List<Map<String, String>> GameLogs = this.players.makeGameLog();
        for(Map<String, String> gameLog : GameLogs){
            // GameLog로 저장할 것과 userRecords로 저장할것 나눠서 저장
            // Update or Save .
            gameLog.put("winTeam",this.winTeam);
            gameLog.put("playTime",String.valueOf(duration.toMinutes()));
            Optional<User> user = userRepository.findByNickname(gameLog.get("nickname"));
            if(user == null) return false;
            gameLogService.addGameLog(gameLog);
            userRecordsService.userUpdateUserRecords(gameLog);
        }

        gameService.deleteById(this.room.getId());
        return true;
    }


}
