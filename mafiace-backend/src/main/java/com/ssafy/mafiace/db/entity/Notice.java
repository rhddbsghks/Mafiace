package com.ssafy.mafiace.db.entity;

import java.time.LocalDateTime;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@ToString
@Entity
@Table(name = "notice")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "notice_id"))
})
public class Notice extends BaseEntity{
    String title;
    String content;
    @Column(name = "post_time")
    LocalDateTime postTime;
    @Column(name = "post_num")
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
