package com.ssafy.mafiace.game;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.game.role.Role;

public class Player {

    private User user;
    private Role role;
    private boolean isAlive;

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

}
