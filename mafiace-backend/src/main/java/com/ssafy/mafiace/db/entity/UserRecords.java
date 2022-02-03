package com.ssafy.mafiace.db.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "user_records")
public class UserRecords {

    @NotNull
    @Id
    @Column(name = "user_unique_id", unique = true)
    String id;

    @ColumnDefault("0")
    @Column(name = "win_count")
    int winCount;
    @ColumnDefault("0")
    @Column(name = "lose_count")
    int loseCount;
    @ColumnDefault("0")
    @Column(name = "mafia_count")
    int mafiaCount;
    @ColumnDefault("0")
    @Column(name = "doctor_count")
    int doctorCount;

    @ColumnDefault("0")
    @Column(name = "police_count")
    int policeCount;

    @ColumnDefault("0")
    @Column(name = "winner_streak")
    int winnerStreak;

    @Builder
    private UserRecords() {
        this.winCount = 0;
        this.loseCount =0;
        this.mafiaCount =0;
        this.doctorCount =0;
        this.policeCount =0;
        this.winnerStreak =0;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_unique_id", referencedColumnName = "user_user_unique_id")
    private User user;

}
