package com.ssafy.mafiace.game;

import com.ssafy.mafiace.api.service.GameLogService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.game.role.Role;
import java.util.List;
import java.util.Map;

public class Player {

    private User user;
    private Role role;
    private boolean isAlive;
    private boolean isBoss;

    private GameLogService gameLogService;


    public Player(User user){
        this.user = user;
    }

    public void Alive(){
        this.isAlive = true;
    }

    public void Dead(){
        this.isAlive = false;
    }

    public boolean isMafia(){
        return this.role.isMafia();
    }

    public boolean isPolice(){
        return this.role.isPolice();
    }

    public boolean isDoctor(){
        return this.role.isDoctor();
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
    }

    public void saveGameLog(Map<String, String> gameLogs){
        gameLogService.addGameLog(gameLogs);
    }
}
