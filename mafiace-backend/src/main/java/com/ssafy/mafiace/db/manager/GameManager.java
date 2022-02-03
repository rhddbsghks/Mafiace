package com.ssafy.mafiace.db.manager;


import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.game.Player;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameManager {

    private GameRepository gameRepository;

    // 게임 내에 사용되는 내부 로직

    private String gameId;
    private Game room;
    private int max;
    private List<User> userList = new ArrayList<>();
    private HashMap<String, Player> playerList = new HashMap<>();
    public GameManager() {}

    public GameManager(String gameId){ // GameService 추가해야함
        this.gameId = gameId;
        this.room = gameRepository.findGameById(gameId);
//      유저 리스트가져오기, 등등
    }

    // 새로운 멤버가 들어왔을 때
    public boolean addMember(User user){
        if(userList.size() >= max) return false;
        this.userList.add(user);
        return true;
    }

    // 게임 시작할 떄
    public void startGame(){
        for (User user: userList) {
            playerList.put(user.getUserId(), new Player(user));
        }
    }

    
    

    public UserRecordsRepositorySupport userRecordsRepositorySupport;
    public UserRecordsRepository userRecordsRepository;

    // 게임 종료
    public boolean saveRecord(){



        return true;
    }


}
