package com.ssafy.mafiace.db.entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Entity
@NoArgsConstructor
@ToString
@Table(name = "delete_account")
public class DeleteAccount {

    @NotNull
    @Id
    @Column(name = "user_unique_id", unique = true)
    String id;

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

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_unique_id", referencedColumnName = "user_user_unique_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }
}