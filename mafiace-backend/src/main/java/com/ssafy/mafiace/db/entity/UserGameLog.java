package com.ssafy.mafiace.db.entity;

import com.ssafy.mafiace.game.role.RoleName;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@Entity(name = "user_game_log")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_game_log_id", unique = true))
})
public class UserGameLog extends BaseEntity{

    @NotNull @Column(name = "job")
    RoleName roleName;

    @NotNull @Column(name = "is_win")
    boolean isWin;

    @Builder
    private UserGameLog(RoleName roleName){
        this.roleName = roleName;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_log_id")
    private GameLog gameLog;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_unique_id")
    private User user;

    public void setGameLog(GameLog gameLog) {
        this.gameLog = gameLog;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
