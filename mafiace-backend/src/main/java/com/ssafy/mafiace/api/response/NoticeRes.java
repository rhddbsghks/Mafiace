package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.Notice;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

// 공지사항 조회 반환 형식
@Getter
@Setter
// BaseResponse에서 statusCode, message 받음
public class NoticeRes extends BaseResponseBody {
    private String title;
    private String content;
    private LocalDateTime postTime;
    private int postNum;

    public static NoticeRes of(Integer statusCode, String message, Notice notice) {
        NoticeRes res = new NoticeRes();

        res.setStatus(statusCode);
        res.setMessage(message);
        // 조회하는 공지사항에서 가져올 값
        res.setTitle(notice.getTitle());
        res.setContent(notice.getContent());
        res.setPostTime(notice.getPostTime());
        res.setPostNum(notice.getPostNum());

        return res;
    }
}
