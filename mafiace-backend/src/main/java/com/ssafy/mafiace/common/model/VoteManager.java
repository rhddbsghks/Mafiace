package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.game.Player;
import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.response.GameResult;
import com.ssafy.mafiace.api.response.GameResultType;
import java.util.HashMap;
import java.util.Map;

public class VoteManager {

    private Map<Player, Player> voteStatus;
    private GamePlayerRes gamePlayerRes;
    private GameResult gameResult;

    public VoteManager(GamePlayerRes gamePlayerRes) {
        this.gamePlayerRes = gamePlayerRes;
        this.voteStatus = new HashMap<>(this.gamePlayerRes.getPlayersNumber());
    }

    // 게임 결과 반환
    public GameResult getGameResult () {
        GameResultType gameResultType = this.gamePlayerRes.confirmGameStatus();
        switch (gameResultType) {
            case MafiaWin:
                return GameResult.returnMafiaWin();
            case CitizenWin:
                return GameResult.returnCitizenWin();
            // 게임 계속 진행하는 로직 필요
        }
    }
}
