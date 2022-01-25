package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.service.NoticeService;
import com.ssafy.mafiace.common.model.NoticeSaveRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @PostMapping()
    public String save(@RequestBody NoticeSaveRequestDto requestDto) {
        return noticeService.save(requestDto);
    }
}