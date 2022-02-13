package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHonorRepository extends JpaRepository<UserHonor, String> {
    Optional<UserHonor> findByUserAndHonorNo(User user, HonorName honorNo);
}
