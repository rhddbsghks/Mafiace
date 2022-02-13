package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.api.response.GameEndRes;
import com.ssafy.mafiace.api.response.VoteRes;
import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.api.service.UserGameLogService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

@Getter
@Setter
public class MafiaceManager {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRecordsService userRecordsService;

    @Autowired
    private UserGameLogService userGameLogService;

    @Autowired
    public GameLogService gameLogService;

    // 게임 내에 사용되는 내부 로직
    private String roomId;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private PlayersManager players;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winTeam;

    private SessionService sessionService;
    private GameService gameService;

    private List<String> deathList = new ArrayList<>();
    private Map<String, Integer> voteMap = new ConcurrentHashMap<>();  // 닉네임이 저장됨
    private String healTarget;

    public MafiaceManager() {
    }

    // 게임 시작할때 생성자 호출
    public MafiaceManager(String roomId, SessionService sessionService, GameService gameService) {
        this.roomId = roomId;
        this.sessionService = sessionService;
        this.gameService = gameService;
        this.room = gameService.getGameById(roomId);
        this.userList = sessionService.getParticipantList(roomId);
        this.players = new PlayersManager(userList);
        this.room.setRoomStatus(true);
        players.setRole();
    }

    public void gameSet() {
        room.setRoomStatus(false);
    }

    // 게임 종료 후 Log 저장
    public boolean saveRecord() {
        endTime = LocalDateTime.now();
        Duration duration = Duration.between(this.startTime, this.endTime);
        System.err.println("PlayTime : " + duration);
        List<Map<String, String>> GameLogs = this.players.makeGameLog();
        for (Map<String, String> gameLog : GameLogs) {
            gameLog.put("winTeam",this.winTeam);
            gameLog.put("playTime",String.valueOf(duration.toMinutes()));
            User user = userService.getUserByNickname(gameLog.get("nickname"));
            if(user == null) return false;
            GameLog savedGameLog = gameLogService.addGameLog(gameLog); // 게임로그id, 플레이 시간(분), 승리 여부 저장
            userGameLogService.saveUserGameLog(savedGameLog, user, gameLog.get("role"), gameLog.get("winTeam")); // 유저, 역할, 이긴 팀 저장
            userRecordsService.userUpdateUserRecords(gameLog); // 유저, 승,패, 직업별 기능 사용 횟수 저장
        }
        gameService.deleteById(this.room.getId());
        return true;
    }

    public void addVoteList(String voted) {
        if (voteMap.containsKey(voted)) {
            int n = voteMap.get(voted);
            voteMap.put(voted, n + 1);
        } else {
            voteMap.put(voted, 1);
        }
    }

    public VoteRes getVoteResult() {
        int MAX = -1;
        VoteRes result = new VoteRes();
        if (voteMap.size() == 0) {  // 아무도 투표한 사람이 없는 경우
            result.setCheck("nobody");
            result.setNickname("x");
            return result;
        }
        for (String key : voteMap.keySet()) {
            if (voteMap.get(key) > MAX) {
                result.setCheck("selected");
                result.setNickname(key);
            } else if (voteMap.get(key) == MAX) {
                result.setCheck("nobody");
                result.setNickname("x");
            }
        }
        if (result.getNickname().equals(healTarget)) {
            // 마피아가 실패 / 의사가 살린횟수 +1
            players.addSaveCount();
            result.setCheck("save");
        }else // 의사가 실패 / 마피아 죽인횟수 +1
            players.addKillCount();
        return result;
    }

    public void reset() {
        voteMap.clear();
        healTarget = "";
    }

    public void addDeathPlayer(String nickname){
        deathList.add(nickname);
    }

    public GameEndRes checkGameEnd(){
        GameEndRes gameEndRes=new GameEndRes();
        int mafiaCount = players.countAliveMafia();
        int citizenCount = players.CountAliveCitizen();
        if (mafiaCount == 0) {
            gameEndRes.setEnd(true);
            gameEndRes.setWinTeam("Citizen");
            this.winTeam = "Citizen";
            return gameEndRes;
        } else if (mafiaCount >= citizenCount) {
            gameEndRes.setEnd(true);
            gameEndRes.setWinTeam("Mafia");
            this.winTeam = "Mafia";
            return gameEndRes;
        }
        return gameEndRes;
    }
}
