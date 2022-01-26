package com.ssafy.mafiace.common.util.db.entity;

import java.time.LocalDate;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@Table(name = "delete_account")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "delete_account_id"))
})
public class DeleteAccount extends BaseEntity{

    @Column(name = "request_date")
    private LocalDate requestDate;
    @Column(name = "finish_date")
    private LocalDate finishDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_unique_id")
    private User user;

}
