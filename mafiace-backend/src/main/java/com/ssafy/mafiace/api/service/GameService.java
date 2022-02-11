package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import java.util.List;

public interface GameService {

    List<Game> getGameList(int maxPlayer, int isPublic);

    boolean checkPassword(String SessionName, String password);

    Game getGameById(String gameId);

    void deleteById(String id);
}
