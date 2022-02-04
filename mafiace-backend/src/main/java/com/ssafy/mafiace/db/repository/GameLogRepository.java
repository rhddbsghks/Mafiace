package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.GameLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameLogRepository extends JpaRepository<GameLog, String> {

}
