package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.repository.GameRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    private GameRepository gameRepository;

    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> getGameList() {
        return gameRepository.findAll();
    }

    @Override
    public int getGameCount() {
        return (int) gameRepository.count();
    }
}
