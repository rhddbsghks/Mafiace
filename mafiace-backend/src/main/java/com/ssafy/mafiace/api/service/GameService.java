package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import java.util.List;

public interface GameService {

    List<Game> getGameList(int maxPlayer, int isPublic);

    boolean checkPassword(String roomId, String password);

    Game getGameById(String roomId);

    void deleteById(String id);

    void setGameStatus(Game game);
}
