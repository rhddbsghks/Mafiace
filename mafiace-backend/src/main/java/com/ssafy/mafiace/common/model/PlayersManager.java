package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.game.Player;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

// 게임 참가자
@Getter
@Setter
public class PlayersManager {

    private List<Player> players;
    private int doctor;
    private int police;
    private List<Integer> mafia;

    public PlayersManager(List<User> users) {
        this.mafia = new ArrayList<>();
        this.players = new ArrayList<>();
        for (User user : users) {
            this.players.add(new Player(user));
        }
    }

    public int getPlayersNumber() {
        return this.players.size();
    }

    public void setRole() {
        int playerNum = getPlayersNumber();
        int mafiaNum = 0, citizenNum;
        if (playerNum < 4) {
            System.err.println(playerNum+"명입니다. 인원이 적습니다.");
        } else if (playerNum < 6) {
            mafiaNum = 1;
        } else if (playerNum < 8) {
            mafiaNum = 2;
        } else if (playerNum == 8) {
            mafiaNum = 3;
        } else {
            System.err.println("인원이 너무 많습니다? 에러");
        }
        Collections.shuffle(this.players);
        citizenNum = playerNum - mafiaNum - 2;
        for (int i = 0; i < playerNum; i++) {
            if (i == 0) {
                this.players.get(i).setRole("Doctor");
                doctor = i;
            } else if (i == 1) {
                this.players.get(i).setRole("Police");
                police = i;
            } else if (i < mafiaNum + 2) {
                this.players.get(i).setRole("Mafia");
                this.mafia.add(i);
            } else if (i < mafiaNum + citizenNum + 2) {
                this.players.get(i).setRole("Citizen");
            }
        }
    }

    public String findRoleName(String nickname) {
        String myRoleName = null;
        for (Player player : this.players) {
            if (player.getNickname().equals(nickname)) {
                myRoleName = player.getRole();
            }
        }
        return myRoleName;
    }

    public Player getPlayer(String nickname) {
        for (Player player : this.players) {
            if (player.getUser().getNickname().equals(nickname)) {
                return player;
            }
        }
        return null;
    }

    public int countAliveMafia() {
        int cnt = 0;
        for (Player player : players) {
            if (player.getRole().equals("Mafia") && player.isAlive()) {
                cnt++;
            }
        }
        return cnt;
    }

    public int countAliveCitizen() {
        int cnt = 0;
        for (Player player : players) {
            if (!player.getRole().equals("Mafia") && player.isAlive()) {
                cnt++;
            }
        }
        return cnt;
    }

    public List<String> getMafia(){
        List<String> mafia=new ArrayList<>();
        for (Player player : players) {
            if (player.getRole().equals("Mafia")) {
                mafia.add(player.getNickname());
            }
        }
        return mafia;
    }

    public void addSaveCount(){
        this.players.get(this.doctor).addSaveCount();
    }

    public void addInvestigateCount(){
        this.players.get(this.police).addInvestigateCount();
    }

    public void addKillCount(){
        for (int i : mafia){
            this.players.get(i).addKillCount();
        }
    }

}
