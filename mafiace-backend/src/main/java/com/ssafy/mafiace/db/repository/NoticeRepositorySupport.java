package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.entity.QNotice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NoticeRepositorySupport {
    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QNotice qNotice = QNotice.notice;

    public List<Notice> getAllNotice() {
        return this.jpaQueryFactory.selectFrom(qNotice)
            .orderBy(qNotice.postNum.desc())
            .fetch();
    }
}
