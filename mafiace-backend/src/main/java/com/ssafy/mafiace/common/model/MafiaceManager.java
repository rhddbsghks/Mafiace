package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.api.response.GameEndRes;
import com.ssafy.mafiace.api.response.VoteRes;
import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.api.service.UserGameLogService;
import com.ssafy.mafiace.api.service.UserHonorService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.GameLog;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.Player;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
public class MafiaceManager {

    // 게임 내에 사용되는 내부 로직
    private String roomId;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private PlayersManager players;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String winTeam;

    @Autowired
    private SessionService sessionService;
    @Autowired
    private GameService gameService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRecordsService userRecordsService;
    @Autowired
    private UserGameLogService userGameLogService;
    @Autowired
    private GameLogService gameLogService ;
    @Autowired
    private UserHonorService userHonorService;

    private List<String> deathList = new ArrayList<>();
    private Map<String, Integer> voteMap = new ConcurrentHashMap<>();  // 닉네임이 저장됨
    private String healTarget;

    public MafiaceManager() {
    }

    // 게임 시작할때 생성자 호출
    public MafiaceManager(String roomId, SessionService sessionService, GameService gameService,
        UserService userService,
        UserRecordsService userRecordsService,
        UserGameLogService userGameLogService,
        GameLogService gameLogService,
        UserHonorService userHonorService) {
        this.roomId = roomId;
        this.sessionService = sessionService;
        this.gameService = gameService;
        this.userService = userService;
        this.userRecordsService = userRecordsService;
        this.userGameLogService = userGameLogService;
        this.gameLogService = gameLogService;
        this.room = gameService.getGameById(roomId);
        this.userList = sessionService.getParticipantList(roomId);
        this.players = new PlayersManager(userList);
        this.room.setRoomStatus(true);
        this.gameService.setGameStatus(this.room);
        players.setRole();
        this.startTime = LocalDateTime.now();
        this.userHonorService = userHonorService;
    }

    public void gameSet() {
        room.setRoomStatus(false);
    }

    // 게임 종료 후 Log 저장
    public boolean saveRecord(){
        // 사용자 정보, 플레이시간, 이긴 팀, 본인 직업 , 죽인 횟수, 살린횟수, 탐지횟수
        endTime = LocalDateTime.now();
        Duration duration = Duration.between(this.startTime, this.endTime);
        String playTime = String.valueOf(duration.getSeconds()/60) +"분 " + String.valueOf(duration.getSeconds()%60) + "초";
        for(Player player : players.getPlayers()){
            boolean isWin = isWin(player.getRole());
            GameLog savedGameLog = gameLogService.addGameLog(playTime, this.winTeam);
            userGameLogService.saveUserGameLog(savedGameLog, player.getUser(),playTime, player.getRole(),isWin);
            UserRecords userRecords = userRecordsService.updateUserRecords(player, isWin, player.getRole());
            userHonorService.saveHonor(userRecords);
        }
        this.room.setRoomStatus(false);
        gameService.setGameStatus(this.room);
        return true;
    }

    public boolean isWin(String role){
        String team = role.equals("Mafia") ? "Mafia" : "Citizen";
        return team.equals(this.winTeam);
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
                MAX=voteMap.get(key);
            } else if (voteMap.get(key) == MAX) {
                result.setCheck("nobody");
                result.setNickname("x");
            }
        }
        if (result.getNickname().equals(healTarget)) {
            // 마피아가 실패 / 의사가 살린횟수 +1
            players.addSaveCount();
            result.setCheck("save");
        }else {
            // 의사가 실패 / 마피아 죽인횟수 +1
            players.addKillCount();
        }
        return result;
    }

    public boolean voteAll(){
        int cnt=0;
        for (String key : voteMap.keySet()) {
            cnt+=voteMap.get(key);
        }
        if(players.countAliveMafia()+players.countAliveCitizen()==cnt){
            return true;
        }
        return false;
    }

    public void reset() {
        voteMap.clear();
        healTarget = "";
    }

    public void addDeathPlayer(String nickname){
        deathList.add(nickname);
    }

    public GameEndRes checkGameEnd(String next){
        GameEndRes gameEndRes=new GameEndRes();
        int mafiaCount = players.countAliveMafia();
        int citizenCount = players.countAliveCitizen();

        if (mafiaCount == 0) {
            gameEndRes.setEnd("end");
            gameEndRes.setWinTeam("Citizen");
            this.winTeam = "Citizen";
            gameEndRes.setMafia(players.getMafia());
            return gameEndRes;
        } else if (mafiaCount >= citizenCount) {
            gameEndRes.setEnd("end");
            gameEndRes.setWinTeam("Mafia");
            this.winTeam = "Mafia";
            gameEndRes.setMafia(players.getMafia());
            return gameEndRes;
        }
        gameEndRes.setEnd(next);
        return gameEndRes;
    }
}
