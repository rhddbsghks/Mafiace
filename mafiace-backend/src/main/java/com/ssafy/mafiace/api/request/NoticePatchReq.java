package com.ssafy.mafiace.api.request;

import lombok.Getter;
import lombok.Setter;

// 공지사항 수정 시 입력받는 값
@Getter
@Setter
public class NoticePatchReq {
    private String title;  // 제목
    private String content;  // 내용
}
