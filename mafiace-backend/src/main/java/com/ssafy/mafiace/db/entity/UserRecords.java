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
import org.checkerframework.common.reflection.qual.ClassBound;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@ToString
@Entity
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
    @Column(name = "save_count")
    int saveCount;
    @ColumnDefault("0")
    @Column(name = "investigate_count")
    int investigateCount;
    @ColumnDefault("0")
    @Column(name = "kill_count")
    int killCount;
    @ColumnDefault("0")
    @Column(name = "citizen_count")
    int citizenCount;
    @ColumnDefault("1000")
    @Column(name = "rating")
    int rating;

    @Builder
    private UserRecords(User user) {
        this.winCount = 0;
        this.loseCount =0;
        this.mafiaCount =0;
        this.doctorCount =0;
        this.policeCount =0;
        this.rating = 1000;
        this.investigateCount =0;
        this.killCount =0;
        this.saveCount =0;
        this.citizenCount =0;
        this.user = user;
    }

    @OneToOne(fetch = FetchType.EAGER)
    @MapsId
    @JoinColumn(name = "user_unique_id", referencedColumnName = "user_user_unique_id")
    private User user;

    public void addCount(int investigateCount, int killCount, int saveCount,  boolean isWin, String role){
        this.killCount += killCount;
        this.saveCount += saveCount;
        this.investigateCount += investigateCount;
        this.winCount += isWin ? 1 : 0;
        this.loseCount += isWin ? 0 : 1;
        if(isWin){
                if(role.equals("Mafia")){
                    this.mafiaCount +=1;
                    this.rating += 39;
                }else {
                    if (role.equals("Police"))
                        this.policeCount += 1;
                    else if (role.equals("Doctor"))
                        this.doctorCount += 1;
                    this.citizenCount += 1;
                    this.rating += 23;
                }
       }else {
            this.rating -= 10;
        }
    }

}
