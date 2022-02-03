package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    private GameRepositorySupport gameRepositorySupport;

    public GameServiceImpl(GameRepositorySupport gameRepositorySupport) {
        this.gameRepositorySupport = gameRepositorySupport;
    }

    @Override
    public List<Game> getGameList(int maxPlayer, int isPublic) {
        return gameRepositorySupport.findGameByOption(maxPlayer, isPublic);
    }
}
