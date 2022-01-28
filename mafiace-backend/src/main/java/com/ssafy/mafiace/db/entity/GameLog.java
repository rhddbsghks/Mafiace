package com.ssafy.mafiace.db.entity;


import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name = "game_log")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "game_log_id"))
})
public class GameLog extends BaseEntity{
    @NotNull @Column(name = "win_team")
    int winTeam;
    @NotNull @Column(name = "play_time")
    int playTime;

    @OneToMany(mappedBy = "gameLog", fetch = FetchType.LAZY)
    private List<UserGameLog> userGameLogs = new ArrayList<>();




}
