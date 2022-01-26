package com.ssafy.mafiace.common.util.db.repository;

import com.ssafy.mafiace.common.util.db.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByuserId(String userId);
}