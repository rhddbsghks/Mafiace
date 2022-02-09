package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public class Police extends Role{

    private RoleName roleName;

    public Police( ){
        super(RoleName.Police);
    }

    public void investigate(Player player){
        player.investigate();
    }

}
