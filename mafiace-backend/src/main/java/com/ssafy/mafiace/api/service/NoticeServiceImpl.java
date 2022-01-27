package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.NoticePatchReq;
import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    NoticeRepository noticeRepository;

    @Override
    public Notice postNotice(NoticePostReq request) {
        return noticeRepository.save(Notice.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .postTime(LocalDateTime.now())
            .postNum((int) noticeRepository.count() + 1)
            .build());
    }

    @Override
    public Optional<Notice> getByPostNum(int postNum) {
        return noticeRepository.findByPostNum(postNum);
    }

    @Override
    public Notice modifyNotice(NoticePatchReq request, Notice notice) {
        notice.setTitle(request.getTitle());
        notice.setContent(request.getContent());

        return noticeRepository.save(notice);
    }
}
