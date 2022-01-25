package com.ssafy.mafiace.db.repository;

import com.ssafy.mafiace.db.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, String> {
}
