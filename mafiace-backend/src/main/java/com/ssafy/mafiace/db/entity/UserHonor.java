package com.ssafy.mafiace.db.entity;

import com.ssafy.mafiace.game.honor.HonorName;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Builder
@Table(name = "user_honor")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_honor_id", unique = true))
})
public class UserHonor extends BaseEntity{

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "honor_no")
    HonorName honorNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_unique_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
    }

}
