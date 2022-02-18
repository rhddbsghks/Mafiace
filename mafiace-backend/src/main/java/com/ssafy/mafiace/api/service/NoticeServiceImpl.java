package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.NoticePatchReq;
import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import com.ssafy.mafiace.db.repository.NoticeRepositorySupport;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class  NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Autowired
    NoticeRepositorySupport noticeRepositorySupport;

    // 공지사항 작성 서비스
    @Override
    public Notice postNotice(NoticePostReq request) {
        return noticeRepository.save(Notice.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .postTime(LocalDateTime.now())
            .postNum((int) noticeRepository.count() + 1)
            .build());
    }

    // 공지사항 전체 조회 서비스
    public List<Notice> getAllNotice() {
        return noticeRepositorySupport.getAllNotice();
    }

    // 특정 공지사항 조회 서비스
    @Override
    public Optional<Notice> getByPostNum(int postNum) {
        return noticeRepository.findByPostNum(postNum);
    }

    // 공지사항 수정 서비스
    @Override
    public Notice modifyNotice(NoticePatchReq registerReq, Notice notice) {
        return noticeRepository.save(
            notice.modifyNotice(registerReq.getTitle(), registerReq.getContent()));

    }

    // 공지사항 삭제 서비스
    @Override
    public void deleteNotice(Notice notice) {
        noticeRepository.delete(notice);
    }
}
