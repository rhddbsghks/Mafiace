package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import java.util.List;

public interface GameService {

    List<Game> getGameList(int maxPlayer, int isPublic);

    List<User> getUserListById(String roomNum);

    boolean checkPassword(String SessionName, String password);
}
