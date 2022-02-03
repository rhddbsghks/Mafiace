package com.ssafy.mafiace.db.manager;


import com.ssafy.mafiace.db.entity.User;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameManager {


    private String gameId;
    private List<User> userList = new ArrayList<>();

    public GameManager() {}

    public GameManager(String gameId){ // GameService 추가해야함
        this.gameId = gameId;
//        this.userList =
//      유저 리스트가져오기, 등등
    }

// 게임방에 들어오고 나가기



}
