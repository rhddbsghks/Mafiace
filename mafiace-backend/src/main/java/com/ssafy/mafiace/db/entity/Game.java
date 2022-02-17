package com.ssafy.mafiace.db.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

@Getter
@ToString
@Entity
@Table(name = "game")
@NoArgsConstructor
@DynamicInsert
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "game_id", unique = true))
})
public class Game extends BaseEntity {

    @NotNull
    @Column(name = "room_num")
    int roomNum;
    @NotNull
    @Column(name = "owner_id")
    String ownerId;
    @NotNull
    @Column(name = "game_title")
    String gameTitle;
    @NotNull
    @Column(name = "is_public")
    boolean isPublic;
    @NotNull
    @Column(name = "discussion_time")
    int discussionTime;
    @NotNull
    @Column(name = "max_player")
    int maxPlayer;
    @NotNull
    @Column(name = "is_active")
    boolean isActive;
    String password;

    @Builder
    private Game(String gameId, int roomNum, String ownerId, String gameTitle, boolean isPublic,
        int discussionTime,boolean isActive,
        int maxPlayer,  String password) {
        this.id = gameId;
        this.roomNum = roomNum;
        this.ownerId = ownerId;
        this.gameTitle = gameTitle;
        this.isPublic = isPublic;
        this.isActive = isActive;
        this.discussionTime = discussionTime;
        this.maxPlayer = maxPlayer;
        this.password = password;
        this.isActive = false;
    }

    public void updateOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public void setRoomStatus(boolean active) {
        this.isActive = active;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
