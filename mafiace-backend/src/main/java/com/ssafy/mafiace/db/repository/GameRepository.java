package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface GameRepository extends JpaRepository<Game, String> {

    Game findGameById(String gameId);
    Game findByRoomNum(int roomNum);
}