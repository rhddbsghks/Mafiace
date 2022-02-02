package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<User> findById(String gamePk);
}