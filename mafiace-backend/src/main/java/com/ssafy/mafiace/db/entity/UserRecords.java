package com.ssafy.mafiace.db.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "user_records")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_records_id", unique = true)),
})
public class UserRecords extends BaseEntity{

    @Column(name = "win_count")
    int winCount;
    @Column(name = "lose_count")
    int loseCount;
    @Column(name = "mafia_count")
    int mafiaCount;
    @Column(name = "doctor_count")
    int doctorCount;
    @Column(name = "winner_streak")
    int winnerStreak;

    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    @Builder
    private UserRecords(int winCount, int loseCount, int mafiaCount, int doctorCount, int winnerStreak){
        this.id = BaseEntity.shortUUID();
        winCount = 0;
        loseCount = 0;
        mafiaCount = 0;
        doctorCount = 0;
        winnerStreak = 0;
    }





}
