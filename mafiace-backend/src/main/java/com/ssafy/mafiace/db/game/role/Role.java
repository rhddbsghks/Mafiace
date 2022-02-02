package com.ssafy.mafiace.db.role;

public class Role {

    private RoleName roleName;

    public Role(RoleName roleName){
        this.roleName = roleName;
    }

    public abstract void vote()

}
