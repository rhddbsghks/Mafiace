package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public class Police extends Role{

    private RoleName roleName;

    public Police(RoleName roleName){
        this.roleName = roleName;
    }

    public void investigate(Player player){
        player.investigate();
    }

}
