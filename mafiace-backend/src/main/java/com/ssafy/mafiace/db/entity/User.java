package com.ssafy.mafiace.db.entity;

import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id",column = @Column(name = "user_unique_id", unique = true))
})
public class User extends BaseEntity implements UserDetails {

    @NotNull @Size(min = 5, max = 12)
    @Pattern(regexp = "[a-zA-Z0-9]{5,12}")
    @Column(name = "user_id", unique = true)
    String userId;
    @NotNull
    String password;
    @NotNull @Column(name = "email", unique = true)
    String email;
    @Pattern(regexp = "[a-zA-Z1-9가-힣]{2,10}")
    @NotNull @Column(name = "nickname", unique = true)
    String nickname;
    @Column(name = "is_deleted")
    boolean isDeleted;

    @Builder
    private User(String userId, String password, String email, String nickname){
        this.id = BaseEntity.shortUUID();
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
    }

    // delete
    public void deleteAccount(String userId) {
        if(userId.equals(this.userId)) {
            isDeleted = true;
        }
    }

    public User modifyUser(String password, String email, String nickname){
        this.password = password;
        this.email = email;
        this.nickname = nickname;

        return this;
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserGameLog> userGameLogs = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private  List<UserHonor> userHonors = new ArrayList<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "delete_account_id")
    private DeleteAccount deleteAccount ;

    public void addUserGameLog(UserGameLog userGameLog){
        this.userGameLogs.add(userGameLog);
        userGameLog.setUser(this);
    }

    public void addUserHonors(UserHonor userHonor) {
        this.userHonors.add(userHonor);
        userHonor.setUser(this);
    }


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
