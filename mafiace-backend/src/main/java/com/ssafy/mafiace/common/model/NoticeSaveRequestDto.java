package com.ssafy.mafiace.common.model;

import com.ssafy.mafiace.db.entity.Notice;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NoticeSaveRequestDto {
    private String title;
    private String content;

    @Builder
    public NoticeSaveRequestDto(String title, String content, int postNum) {
        this.title = title;
        this.content = content;
    }

    public Notice toEntity() {
        return Notice.builder()
            .title(title)
            .content(content)
            .build();
    }
}
