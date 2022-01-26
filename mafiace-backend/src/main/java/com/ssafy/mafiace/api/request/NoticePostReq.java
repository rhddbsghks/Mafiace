package com.ssafy.mafiace.api.request;

import lombok.Getter;
import lombok.Setter;

// 공지사항 작성 시 입력받는 값
@Getter
@Setter
public class NoticePostReq {
    private String title;  // 제목
    private String content;  // 내용
}
