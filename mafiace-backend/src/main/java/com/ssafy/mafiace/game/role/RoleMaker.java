package com.ssafy.mafiace.game.role;

import java.util.ArrayList;
import java.util.List;

public class RoleMaker {
    public int playerCount;
    public int mafiaCount;
    public int citizenCount;
    public int doctorCount;
    public int policeCount;

    public RoleMaker(int playerCount, int mafiaCount, int citizenCount, int doctorCount,
        int policeCount) {
        this.playerCount = playerCount;
        this.mafiaCount = mafiaCount;
        this.citizenCount = citizenCount;
        this.doctorCount = doctorCount;
        this.policeCount = policeCount;
    }

    public List<Role> makeRole(){
        List<Role> list = new ArrayList<>();
        for(int i=0; i<this.mafiaCount; i++){
            list.add(new Mafia());
        }
        for(int i=0; i<this.citizenCount; i++){
            list.add(new Citizen());
        }
        for(int i=0; i<this.doctorCount; i++){
            list.add(new Police());
        }
        for(int i=0; i<this.policeCount; i++){
            list.add(new Police());
        }
        return list;
    }

}
