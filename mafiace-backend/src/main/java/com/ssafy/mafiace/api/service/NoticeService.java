package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.NoticePatchReq;
import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.db.entity.Notice;
import java.util.List;
import java.util.Optional;

public interface NoticeService {

    Notice postNotice(NoticePostReq request);  // 공지사항 작성

    List<Notice> getAllNotice();  // 공지사항 전체 조회

    Optional<Notice> getByPostNum(int postNum);  // 특정 공지사항 조회

    Notice modifyNotice(NoticePatchReq noticePatchReq, Notice notice);  // 공지사항 수정

    void deleteNotice(Notice notice);  // 공지사항 삭제
}
