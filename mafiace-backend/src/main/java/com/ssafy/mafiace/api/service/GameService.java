package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import java.util.List;

public interface GameService {

    List<Game> getGameList(int maxPlayer, int isPublic);
}
