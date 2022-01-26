package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.api.service.NoticeService;
import com.ssafy.mafiace.db.entity.Notice;
import com.ssafy.mafiace.db.repository.NoticeRepository;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    // 공지사항 작성
    @PostMapping()
    public ResponseEntity<String> postNotice(@RequestBody NoticePostReq postReq) {
        Notice notice = noticeService.postNotice(postReq);

        if (notice == null) {
            return new ResponseEntity<String> ("공지사항 작성에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }
}