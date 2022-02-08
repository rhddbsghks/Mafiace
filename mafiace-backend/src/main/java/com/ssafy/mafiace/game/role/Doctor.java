package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public class Doctor extends Role{

    private RoleName roleName;

    public Doctor(){
        super(RoleName.Doctor);
    }

    public void sugery(Player player){
        player.Sergery();
    }

}
