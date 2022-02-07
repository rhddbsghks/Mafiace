package com.ssafy.mafiace.db.manager;


import com.ssafy.mafiace.api.response.GamePlayerRes;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MafiaceManager {

    private GameRepository gameRepository;

    private GameService gameService;

    // 게임 내에 사용되는 내부 로직

    private String gameId;
    private String roomNum;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private GamePlayerRes players;
    public MafiaceManager() {}

    public MafiaceManager(String gameId){ // GameService 추가해야함
        this.gameId = gameId;
        this.room = gameRepository.findGameById(gameId);
        userList = gameService.getUserListById(gameId);
//      유저 리스트가져오기, 등등
    }

    // 새로운 멤버가 들어왔을 때
    public boolean addMember(User user){
        if(userList.size() >= max) return false;
        this.userList.add(user);
//        this.room.getUser_List().add(user); 위랑 같은거같은데.. 실험필요
        return true;
    }

    public boolean leaveMember(User user){
        if(userList.size() == 1) {
            // 방폭파로직
            return false;
        }else {
            // 한명 빠지는 로직
            this.userList.remove(user);
            return true;
        }
    }

    // 게임 시작할 떄
    // userList에 있는걸 players로 저장
    // room 상태 Active
    public void startGame(){
        players = new GamePlayerRes(userList);
        room.setRoomStatus(true);
    }

    public UserRecordsRepositorySupport userRecordsRepositorySupport;
    public UserRecordsRepository userRecordsRepository;

    // 게임 종료
    public boolean saveRecord(){
        List<Map<String, String>> GameLogs = players.makeGameLog();
        for(Map<String, String> player : GameLogs){
            // GameLog로 저장할 것과 userRecords로 저장할것 나눠서 저장
            // Update or Save ..
        }
        return true;
    }


}
