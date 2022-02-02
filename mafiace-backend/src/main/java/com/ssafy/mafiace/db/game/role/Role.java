package com.ssafy.mafiace.db.game.role;

public abstract class Role {

    private RoleName roleName;

    public Role(RoleName roleName){
        this.roleName = roleName;
    }

    public abstract void vote();

}
