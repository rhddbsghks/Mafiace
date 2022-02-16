package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    @Autowired
    private GameRepositorySupport gameRepositorySupport;

    @Autowired
    private GameRepository gameRepository;

    public GameServiceImpl(GameRepositorySupport gameRepositorySupport,
        GameRepository gameRepository) {
        this.gameRepositorySupport = gameRepositorySupport;
        this.gameRepository = gameRepository;
    }

    @Override
    public List<Game> getGameList(int maxPlayer, int isPublic) {
        return gameRepositorySupport.findGameByOption(maxPlayer, isPublic);
    }

    @Override
    public boolean checkPassword(String roomId, String password) {
        Game game = gameRepositorySupport.findById(roomId);

        if (game.getPassword().equals(password)) {
            return true;
        }

        return false;
    }

    @Override
    public Game getGameById(String roomId) {
        return gameRepository.findGameById(roomId);
    }

    @Override
    public void deleteById(String id) {
        gameRepository.deleteById(id);
    }

    @Override
    public void setGameStatus(Game game) {
        gameRepository.save(game);
    }
}
