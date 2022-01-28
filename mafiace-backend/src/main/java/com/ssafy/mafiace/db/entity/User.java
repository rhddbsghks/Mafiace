package com.ssafy.mafiace.db.entity;

import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "user")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_unique_id"))
})
public class User extends BaseEntity implements UserDetails {


    // java 는 카멜표기법을 권장하기때문에 카멜로 선언 후 스네이크로 db에 저장
    @NotNull @Size(max = 12, min = 5)
    @Column(name = "user_id", unique = true)
    String userId;
    @NotNull @Size(min = 8, max = 16)
    @Column(name = "password")
    String password;
    @NotNull @Column(name = "email")
    String email;
    @NotNull @Size(min = 2, max = 10)
    @Column(name = "nickname", unique = true)
    String nickname;
    @Column(name = "is_deleted")
    boolean isDeleted;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserGameLog> user_game_logs = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private  List<UserHonor> UserHonors = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
