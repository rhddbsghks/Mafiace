package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeRepository noticeRepository;

    @PostMapping()
    public String notice(@RequestBody Map<String, Object> body) {
        return noticeRepository.save(Notice.builder()
            .title(body.get("title").toString())
            .content(body.get("content").toString())
            .postTime(LocalDateTime.now())
            .build()).getId();
    }
}