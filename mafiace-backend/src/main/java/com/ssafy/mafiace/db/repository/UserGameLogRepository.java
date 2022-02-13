package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.UserGameLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGameLogRepository extends JpaRepository<UserGameLog, String> {

}
