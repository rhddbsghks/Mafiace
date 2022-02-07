package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public class Doctor extends Role{

    private RoleName roleName;

    public Doctor(RoleName roleName){
        this.roleName = roleName;
    }

    public void sugery(Player player){
        player.Sergery();
    }

}
