package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.game.Player;
import com.ssafy.mafiace.game.role.Role;
import com.ssafy.mafiace.game.role.RoleName;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

// 게임 참가자
@Getter
@Setter
public class GamePlayerRes {

    private List<Player> players;
    private RoleName roleName;

    public GamePlayerRes(List<User> users){
        this.players = new ArrayList<>();
        for(User user : users){
            this.players.add(new Player(user));
        }
    }

    public int getPlayersNumber(){
        return this.players.size();
    }

    public void setRole(List<Role> roles){
        for(int i=0; i<getPlayersNumber(); i++){
            this.players.get(i).setRole(roles.get(i));
        }
    }

    public RoleName findRoleName(String nickname){
        RoleName myRoleName = null;
        for(Player player : this.players){
            if(player.getUser().getNickname().equals(nickname)){
                myRoleName = player.getRole().getRoleName();
            }
            return  myRoleName;
        }
        return null;
    }

    public Player getPlayer(String nickname){
        for (Player player : this.players){
            if(player.getUser().getNickname().equals(nickname)){
                return player;
            }
        }
        return null;
    }

    public void removeDeadPlayer(Player player){
        // 죽은 플레이어 없애기
    }

    public GameResultType confirmGameStatus(){
        int mafiaCount = this.aliveMafiaCount();
        int citizenCount = this.aliveCitizenCount();
        if(mafiaCount == 0) return GameResultType.CitizenWin;
        else if(mafiaCount >= citizenCount) return GameResultType.MafiaWin;
        else return GameResultType.InGame;
    }

    public int aliveMafiaCount(){
        int cnt =0;
        for(Player player : players){
            if(player.isMafia() && player.isAlive()){
                cnt +=1;
            }
        }
        return cnt;
    }

    public int aliveCitizenCount(){
        int cnt =0;
        for(Player player : players){
            if(!player.isMafia() && player.isAlive()){
                cnt +=1;
            }
        }
        return cnt;
    }


    // 반환하는 String[]
    // "홍길동 Mafia"
    // "강감찬 Citizen"
    // "전우치 Police"
    // "김선달 Doctor"
    public String[][] getRoleString(){
        String[][] stringArr = new String[players.size()][2];
        for(int i=0; i<stringArr.length; i++){
            stringArr[i][0] = this.players.get(i).getUser().getNickname();
            stringArr[i][1] = this.players.get(i).getRole().getRoleName().name();
        }
        return stringArr;
    }

    public List<Map<String, String>> makeGameLog(){
        List<Map<String, String>> GameLogs = new ArrayList<>();
        for(Player player : this.players){
            Map<String, String> buf = new HashMap<>();
            buf.put("userId", player.getUser().getUserId());
            buf.put("Role",player.getRole().getRoleName().name());
//          추가 해야할 것 : 이긴 팀
//            buf.put("winTeam",player.)
            if(player.getRole().getRoleName().name().equals("Mafia")){
                buf.put("killCount",String.valueOf(player.getKillCount()));
            }else if(player.getRole().getRoleName().name().equals("Doctor")){
                buf.put("saveCount",String.valueOf(player.getSaveCount()));
            }else if(player.getRole().getRoleName().name().equals("Police")){
                buf.put("investigateCount",String.valueOf(player.getInvestigateCount()));
            }
            GameLogs.add(buf);
        }
        return GameLogs;
    }







}
