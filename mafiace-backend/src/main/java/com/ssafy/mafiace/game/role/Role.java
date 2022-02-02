package com.ssafy.mafiace.game.role;

import com.ssafy.mafiace.game.Player;

public abstract class Role {

    private RoleName roleName;

    public Role(RoleName roleName){
        this.roleName = roleName;
    }

    public abstract void vote(Player player);

    public boolean isMafia(){
        return roleName.equals(RoleName.Mafia);
    }

    public boolean isDoctor(){
        return roleName.equals(RoleName.Doctor);
    }

    public boolean isPolice(){
        return roleName.equals(RoleName.Police);
    }

}
