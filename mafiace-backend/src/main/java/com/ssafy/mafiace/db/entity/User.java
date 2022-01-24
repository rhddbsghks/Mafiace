package com.ssafy.mafiace.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name = "user")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_unique_id"))
})
public class User extends BaseEntity{

    // java 는 카멜표기법을 권장하기때문에 카멜로 선언 후 스네이크로 db에 저장
    @Column(name = "user_id")
    String userId;
    String password;
    String email;
    String nickname;
    @Column(name = "is_deleted")
    boolean isDeleted;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserGameLog> user_game_logs = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private  List<UserHonor> UserHonors = new ArrayList<>();


}
