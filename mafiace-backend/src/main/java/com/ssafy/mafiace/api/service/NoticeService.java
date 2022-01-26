package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.NoticePostReq;
import com.ssafy.mafiace.db.entity.Notice;
import java.util.Optional;

public interface NoticeService {
    Notice postNotice(NoticePostReq request);  // 공지사항 작성
    Optional<Notice> getByPostNum(int postNum);
}
