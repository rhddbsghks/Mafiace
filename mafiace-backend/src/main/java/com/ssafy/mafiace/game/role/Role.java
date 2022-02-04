package com.ssafy.mafiace.game.role;
import com.ssafy.mafiace.game.Player;

public abstract class Role {

    private RoleName roleName;

    public Role(RoleName roleName){
        this.roleName = roleName;
    }

    protected Role() {
    }

    public String getRoleName() {
        return roleName.name();
    }

    @Override
    public String toString(){
        return roleName.name();
    }

    public abstract void nightVote(Player player);

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
