package com.ssafy.mafiace.db.entity;

import java.time.LocalDateTime;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "notice")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "notice_id"))
})
public class Notice extends BaseEntity{
    @NotNull @Column(name = "title")
    String title;
    @NotNull @Column(name = "content")
    String content;
    @NotNull @Column(name = "post_time")
    LocalDateTime postTime;
    @NotNull @Column(name = "post_num")
    int postNum;
}
