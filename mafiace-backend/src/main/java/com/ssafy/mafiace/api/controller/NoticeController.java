package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.NoticePatchReq;
import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.api.response.NoticeRes;
import com.ssafy.mafiace.api.response.UserLoginPostRes;
import com.ssafy.mafiace.api.service.NoticeService;
import com.ssafy.mafiace.db.entity.Notice;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "공지사항 API", tags = {"AuthController"})
@RestController
@RequestMapping("/api/notice")
public class NoticeController {

    @Autowired
    NoticeService noticeService;

    // 공지사항 작성
    @PostMapping()
    @ApiOperation(value = "공지사항 작성", notes = "제목과 내용을 받아 공지사항을 작성한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "공지사항을 성공적으로 작성하였습니다."),
        @ApiResponse(code = 400, message = "공지사항 작성 실패"),
    })
    public ResponseEntity<String> postNotice(@RequestBody NoticePostReq postReq) {
        Notice notice = noticeService.postNotice(postReq);

        if (notice == null) {
            return new ResponseEntity<String>("공지사항 작성에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<String>("공지사항을 성공적으로 작성하였습니다.", HttpStatus.OK);
    }

    // 공지사항 전체 조회
    @GetMapping()
    @ApiOperation(value = "공지사항 전체 조회", notes = "모든 공지사항을 조회한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "공지사항을 성공적으로 조회하였습니다."),
    })
    public List<Notice> getNoticeList() {
        return noticeService.getAllNotice();
    }

    // 특정 공지사항 조회
    @GetMapping("/{postNum}")
    @ApiOperation(value = "특정 공지사항 조회", notes = "해당 번호의 공지사항을 조회한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "공지사항을 성공적으로 조회하였습니다."),
        @ApiResponse(code = 404, message = "존재하지 않는 공지사항입니다."),
    })
    public ResponseEntity<NoticeRes> getNotice(@PathVariable int postNum) {
        Optional<Notice> notice = noticeService.getByPostNum(postNum);

        if (notice.isPresent()) {
            return ResponseEntity.status(200)
                .body(NoticeRes.of(200, "공지사항을 성공적으로 조회하였습니다.", notice.get()));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다.",notice.get()));
    }

    // 공지사항 수정
    @PatchMapping("/{postNum}")
    @ApiOperation(value = "공지사항 수정", notes = "해당 번호의 공지사항을 수정한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "공지사항을 수정하였습니다."),
        @ApiResponse(code = 404, message = "존재하지 않는 공지사항입니다."),
    })
    public ResponseEntity<NoticeRes> modifyNotice(@PathVariable int postNum,
        @RequestBody NoticePatchReq request) {
        Optional<Notice> optionalNotice = noticeService.getByPostNum(postNum);

        if (optionalNotice.isPresent()) {
            Notice notice = noticeService.modifyNotice(request, optionalNotice.get());

            return ResponseEntity.status(201).body(NoticeRes.of(200, "공지사항을 수정하였습니다.", optionalNotice.get()));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다.", optionalNotice.get()));
    }

    // 공지사항 삭제
    @DeleteMapping("/{postNum}")
    @ApiOperation(value = "공지사항 삭제", notes = "해당 번호의 공지사항을 삭제한다.")
    @ApiResponses({
        @ApiResponse(code = 204, message = "공지사항을 삭제하였습니다."),
        @ApiResponse(code = 404, message = "존재하지 않는 공지사항입니다."),
    })
    public ResponseEntity<NoticeRes> deleteNotice(@PathVariable int postNum) {
        Optional<Notice> optionalNotice = noticeService.getByPostNum(postNum);

        if (optionalNotice.isPresent()) {
            noticeService.deleteNotice(optionalNotice.get());
            return ResponseEntity.status(204).body(NoticeRes.of(204, "공지사항을 삭제하였습니다.",optionalNotice.get()));
        }

        return ResponseEntity.status(404).body(NoticeRes.of(404, "존재하지 않는 공지사항입니다.",optionalNotice.get()));
    }
}
