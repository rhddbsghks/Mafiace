package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class GameServiceImpl implements GameService {

    private GameRepositorySupport gameRepositorySupport;

    private GameRepository gameRepository;

    public GameServiceImpl(GameRepositorySupport gameRepositorySupport) {
        this.gameRepositorySupport = gameRepositorySupport;
    }

    @Override
    public List<Game> getGameList(int maxPlayer, int isPublic) {
        return gameRepositorySupport.findGameByOption(maxPlayer, isPublic);
    }

    @Override
    public List<User> getUserListById(String id) {
        Optional<Game> game = gameRepository.findById(id);
        if(game.isPresent()){
            return game.get().getUser_List();
        }
        return null;
    }

    @Override
    public boolean checkPassword(String sessionName, String password) {
        Game game = gameRepositorySupport.findById(sessionName);

        if(game.getPassword().equals(password))
            return true;

        return false;
    }
}
