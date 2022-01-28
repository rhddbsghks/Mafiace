package com.ssafy.mafiace.db.entity;

import java.time.LocalDateTime;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@ToString
@Entity
@Builder
@Table(name = "notice")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "notice_id", unique = true))
})
public class Notice extends BaseEntity{
    @NotNull @Column(name = "title")
    String title;
    @NotNull @Column(name = "content")
    @Lob
    String content;
    @Column(name = "post_time")
    LocalDateTime postTime;
    @NotNull @Column(name = "post_num")
    int postNum;

    public Notice () {}

    @Builder
    public Notice(String title, String content, LocalDateTime postTime, int postNum) {
        this.title = title;
        this.content = content;
        this.postTime = postTime;
        this.postNum = postNum;
    }
}
