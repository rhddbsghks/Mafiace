package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, String> {

    Game findGameById(String gameId);
}