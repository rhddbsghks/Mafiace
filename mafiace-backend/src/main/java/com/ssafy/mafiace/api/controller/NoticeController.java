package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.NoticePatchReq;
import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.api.response.NoticeRes;
import com.ssafy.mafiace.api.service.NoticeService;
import com.ssafy.mafiace.db.entity.Notice;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
    public ResponseEntity<String> postNotice(@RequestBody NoticePostReq postReq, Authentication authentication) {
        Notice notice = noticeService.postNotice(postReq);

        if (notice == null) {
            return new ResponseEntity<String> ("공지사항 작성에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("Success", HttpStatus.OK);
    }

    // 공지사항 전체 조회
    @GetMapping()
    public List<Notice> getNoticeList() {
        return noticeService.getAllNotice();
    }

    // 특정 공지사항 조회
    @GetMapping("/{postNum}")
    public ResponseEntity<? extends BaseResponse> getNotice(@PathVariable int postNum) {
        Optional<Notice> notice = noticeService.getByPostNum(postNum);

        if (notice.isPresent()) {
            return ResponseEntity.status(200).body(NoticeRes.of(200, "공지사항을 성공적으로 조회하였습니다.", notice.get()));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다."));
    }

    // 공지사항 수정
    @PatchMapping("/{postNum}")
    public ResponseEntity<? extends BaseResponse> modifyNotice (@PathVariable int postNum,
        @RequestBody NoticePatchReq request) {
        Optional<Notice> optionalNotice = noticeService.getByPostNum(postNum);

        if (optionalNotice.isPresent()) {
            Notice notice = noticeService.modifyNotice(request, optionalNotice.get());

            return ResponseEntity.status(201).body(NoticeRes.of(200, "공지사항을 수정하였습니다."));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다."));
    }

    // 공지사항 삭제
    @DeleteMapping("/{postNum}")
    public ResponseEntity<? extends BaseResponse> deleteNotice (@PathVariable int postNum) {
        Optional<Notice> optionalNotice = noticeService.getByPostNum(postNum);

        if (optionalNotice.isPresent()) {
            noticeService.deleteNotice(optionalNotice.get());
            return ResponseEntity.status(204).body(NoticeRes.of(204, "공지사항을 삭제하였습니다."));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다."));
    }
}
