package com.ssafy.mafiace.common.model;


import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.response.VoteRes;
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
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MafiaceManager {

    private GameRepository gameRepository;

    private GameService gameService;

    private UserRepository userRepository;

    // 게임 내에 사용되는 내부 로직

    private String roomId;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private GamePlayerRes players;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winTeam;
    private SessionService sessionService;

    private List<String> aliveList=new ArrayList<>();
    private List<String> dieList=new ArrayList<>();
    private Map<String,Integer> voteMap=new ConcurrentHashMap<>();  // 닉네임이 저장됨
    private String healTarget;

    public MafiaceManager() {}

    // 게임 시작할때 생성자 호출
    public MafiaceManager(String roomId, SessionService sessionService){ // GameService 추가해야함
        this.roomId = roomId;
        this.room = gameRepository.findGameById(roomId);
        this.sessionService = sessionService;
        this.userList = gameService.getUserListById(roomId);
        this.players = new GamePlayerRes(userList);
        this.room.setRoomStatus(true);

    }

    public void gamSet(){
        room.setRoomStatus(false);
    }


    public UserRecordsRepositorySupport userRecordsRepositorySupport;
    public UserRecordsRepository userRecordsRepository;
    public GameLogService gameLogService;
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
            Optional<User> user = userRepository.findByUserId(gameLog.get("userId"));
            if(user == null) return false;
            gameLogService.addGameLog(gameLog);
            userRecordsRepositorySupport.updateUserRecords(gameLog);
        }

        gameRepository.deleteById(this.room.getId());
        return true;
    }

    public void addVoteList(String voted){
        if(voteMap.containsKey(voted)){
            int n=voteMap.get(voted);
            voteMap.put(voted,n+1);
        }else{
            voteMap.put(voted,1);
        }
    }

    public VoteRes getVoteResult(){
        int MAX=-1;
        VoteRes result=new VoteRes();
        if(voteMap.size()==0){  // 아무도 투표한 사람이 없는 경우
            result.setCheck("nobody");
            result.setNickname("x");
            return result;
        }
        for(String key: voteMap.keySet()){
            if(voteMap.get(key)>MAX) {
                result.setNickname(key);
            }else if(voteMap.get(key)==MAX){
                result.setCheck("nobody");
                result.setNickname("x");
                return result;
            }
        }
        result.setCheck("selected");
        return result;
    }

    public void reset(){
        voteMap.clear();
        healTarget="";
    }
}
