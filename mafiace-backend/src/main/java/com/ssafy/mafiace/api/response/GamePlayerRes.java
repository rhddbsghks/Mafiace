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


    // 반환하는 String[]
    // "홍길동 Mafia"
    // "강감찬 Citizen"
    // "전우치 Police"
    // "김선달 Doctor"
    public String[] getRoleString(){
        String[] stringArr = new String[players.size()];
        for(int i=0; i<stringArr.length; i++){
            StringBuilder sb = new StringBuilder();
            sb.append(this.players.get(i).getUser().getNickname()+" ");
            sb.append(this.players.get(i).getRole());
            stringArr[i] = sb.toString();
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
//          추가로 추가하면 좋을 것 : 의사 or 경찰이 능력사용에 성공한 횟수, 마피아가 시민을 죽인 횟수 등

            GameLogs.add(buf);
        }
        return GameLogs;
    }







}
