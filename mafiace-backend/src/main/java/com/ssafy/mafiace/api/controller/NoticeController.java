package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.api.response.NoticeRes;
import com.ssafy.mafiace.api.service.NoticeService;
import com.ssafy.mafiace.common.model.BaseResponse;
import com.ssafy.mafiace.db.entity.Notice;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    // 공지사항 조회
    @GetMapping("/{postNum}")
    public ResponseEntity<? extends BaseResponse> getNotice(@PathVariable int postNum) {
        Optional<Notice> notice = noticeService.getByPostNum(postNum);

        if (notice.isPresent()) {
            return ResponseEntity.status(200).body(NoticeRes.of(200, "공지사항을 성공적으로 조회하였습니다.", notice.get()));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다."));
    }
}