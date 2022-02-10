package com.ssafy.mafiace.db.manager;

import com.ssafy.mafiace.game.Player;
import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.response.GameResult;
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

}
