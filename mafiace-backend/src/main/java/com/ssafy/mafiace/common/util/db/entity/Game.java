package com.ssafy.mafiace.common.util.db.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Transient;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Entity
@Table(name = "game")
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "game_id"))
})
public class Game extends BaseEntity{
    @Column(name = "room_num")
    @GeneratedValue(strategy = GenerationType.AUTO)
    int roomNum;
    @Column(name = "owner_id")
    String ownerId;
    @Column(name = "game_title")
    String gameTitle;
    @Column(name = "is_public")
    boolean isPublic;
    @Column(name = "discussion_time")
    int discussionTime;
    @Column(name = "max_player")
    int maxPlayer;
    String password;
    @Column(name = "is_active")
    @Enumerated
    IsActive isActive;

    @Transient
    List<User> user_List = new ArrayList<>();
}
