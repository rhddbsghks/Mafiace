package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRecordsRepository extends JpaRepository<UserRecords, String> {
}
