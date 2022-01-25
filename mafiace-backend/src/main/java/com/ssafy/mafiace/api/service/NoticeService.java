package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.common.model.NoticeSaveRequestDto;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoticeService {
    private NoticeRepository noticeRepository;

    @Transactional
    public String save(NoticeSaveRequestDto requestDto) {
        return noticeRepository.save(requestDto.toEntity()).getId();
    }
}
