package com.ssafy.mafiace.db.entity;

import java.time.LocalDate;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Entity
@ToString
@Table(name = "delete_account")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "delete_account_id", unique = true))
})
public class DeleteAccount extends BaseEntity{

    @NotNull
    @Column(name = "request_date")
    LocalDate requestDate;
    @NotNull
    @Column(name = "finish_date")
    LocalDate finishDate;

    @Builder
    private DeleteAccount(LocalDate requestDate, LocalDate finishDate){
        this.requestDate = requestDate;
        this.finishDate = finishDate;
    }

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public void setUser(User user) {
        this.user = user;
    }
}
