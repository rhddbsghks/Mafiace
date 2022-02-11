package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.api.request.VoteReq;
import com.ssafy.mafiace.game.Player;
import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.response.GameResult;
import com.ssafy.mafiace.api.response.GameResultType;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class VoteManager {

    private Map<Player, Player> voteStatus;
    private GamePlayerRes gamePlayerRes;
    private GameResult gameResult;

    public VoteManager(GamePlayerRes gamePlayerRes) {
        this.gamePlayerRes = gamePlayerRes;
        this.voteStatus = new HashMap<>(this.gamePlayerRes.getPlayersNumber());  // 전체 투표 현황
    }

    // 투표 처리 및 상태 반환
    public boolean isVoted (VoteReq voteReq) {
        Player votingPlayer = this.gamePlayerRes.getPlayer(voteReq.getNickname());  // 투표자
        Player votingFor = this.gamePlayerRes.getPlayer(voteReq.getVotedFor());  // 누구를 투표

        voteStatus.put(votingPlayer, votingFor);

        if (voteReq.getCurrentStage().equals("day") && voteStatus.size() >= this.gamePlayerRes.getPlayersNumber()) {
            return true;  // 모든 플레이어가 투표
        } else if (voteReq.getCurrentStage().equals("night") && voteStatus.size() == 1) {
            return true;  // 마피아 보스가 선택 완료
        }
        return false;
    }

    // 투표 집계
    private Map<Player, Integer> getVotingResult (VoteReq voteReq) {
        Map<Player, Integer> playerVotedCounts = new ConcurrentHashMap<>();
        List<Player> playerList = gamePlayerRes.getPlayers();
        playerList.forEach(player -> playerVotedCounts.put(player, 0));
        voteStatus.values().forEach(player -> {
            if (player != null) {
                playerVotedCounts.put(player, playerVotedCounts.get(player) + 1);
            }
        });
        return playerVotedCounts;
    }

    // 투표 결과 (선택된 플레이어 닉네임) 반환
    private String getVotedPlayer(Map<Player, Integer> playerVotedCounts) {
        Player votedPlayer = null;
        int maxVotes = 0;

        for (Map.Entry<Player, Integer> entry : playerVotedCounts.entrySet()) {
            if (entry.getValue() > maxVotes) {
                // 가장 많은 표를 받은 플레이어 및 표 수 갱신
                votedPlayer = entry.getKey();
                maxVotes = entry.getValue();
            } else if (entry.getValue() == maxVotes) {
                // 동률 존재
                votedPlayer = null;
            }
        }
        if (votedPlayer != null) {
            voteStatus.clear();
            return votedPlayer.getNickname();
        }
        voteStatus.clear();
        return "";
    }

    // 게임 결과 반환
    public GameResult getGameResult () {
        GameResultType gameResultType = this.gamePlayerRes.confirmGameStatus();
        switch (gameResultType) {
            case MafiaWin:
                return GameResult.returnMafiaWin();
            case CitizenWin:
                return GameResult.returnCitizenWin();
        }
        return GameResult.returnInGame();  // 게임 끝나지 않아 계속 진행
    }
}
