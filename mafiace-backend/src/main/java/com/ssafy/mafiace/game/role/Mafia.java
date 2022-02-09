package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public class Mafia extends Role{

    private RoleName roleName;

    public Mafia() {
        super(RoleName.Mafia);
    }


    public void nightVote(Player player) {
        player.kill();
    }


}
