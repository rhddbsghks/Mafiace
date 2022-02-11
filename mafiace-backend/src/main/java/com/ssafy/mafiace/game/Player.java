package com.ssafy.mafiace.game;

import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.game.role.Role;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {

    private User user;
    private String nickname;
    private String role;
    private boolean isAlive;
    private boolean isBoss;
    private int saveCount ;
    private int killCount;
    private int investigateCount;

    private GameLogService gameLogService;


    public Player(User user){
        this.user = user;
        this.nickname = user.getNickname();
        this.isAlive = true;
        this.saveCount = 0;
        this.killCount = 0;
        this.investigateCount = 0;
    }

    public void Alive(){
        this.isAlive = true;
    }

    public void Dead(){
        this.isAlive = false;
    }

    public boolean isAlive(){
        return this.isAlive;
    }

    public boolean isBoss() { return this.isBoss; }

    public User getUser(){
        return this.user;
    }


    public void kill() {
        if(!isBoss) return;
        // 보스일때만 kill가능~
        // kill 로직
        // 성공 시 kill_count +=1;
    }

    public void surgery() {
        // 수술해서 살리기
        // 성공 시 saveCount +=1;
    }

    public void investigate() {
        // 한명 조사하기
        // 성공 시 invertigateCount +=1;
    }

    public void saveGameLog(){
        Map<String, String> gameLogs = new HashMap<>();

        gameLogService.addGameLog(gameLogs);
    }




}
