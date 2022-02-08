package com.ssafy.mafiace.db.entity;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GeneratorType;

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
        int discussionTime,
        int maxPlayer,  String password) {
        this.id = gameId;
        this.roomNum = roomNum;
        this.ownerId = ownerId;
        this.gameTitle = gameTitle;
        this.isPublic = isPublic;
        this.discussionTime = discussionTime;
        this.maxPlayer = maxPlayer;
        this.password = password;
        this.isActive = false;
        this.user_List = new ArrayList<>();
    }
    @Transient
    List<User> user_List;

    public void initUserList(){
        this.user_List = new ArrayList<>();
    }

    public void addUserList(User user){
        this.user_List.add(user);
    }


    public void setRoomStatus(boolean active) {
        isActive = active;
    }
}
