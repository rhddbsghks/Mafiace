package com.ssafy.mafiace.api.response;


import com.ssafy.mafiace.db.entity.Game;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameResult {

    private String winTeam;

    public GameResult() {
    }

    public GameResult(GameResultType type){
        switch (type){
            case MafiaWin: this.winTeam = "MAFIA"; break;
            case CitizenWin: this.winTeam = "CITIZEN"; break;
        }
    }

    public static GameResult returnMafiaWin() {
        return new GameResult(GameResultType.MafiaWin);
    }

    public static GameResult returnCitizenWin(){
        return new GameResult(GameResultType.CitizenWin);
    }

}
