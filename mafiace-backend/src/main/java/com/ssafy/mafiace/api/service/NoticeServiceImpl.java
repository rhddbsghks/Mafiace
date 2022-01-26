package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import java.time.LocalDateTime;
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
}
