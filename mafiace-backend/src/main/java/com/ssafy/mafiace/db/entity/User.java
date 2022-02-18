package com.ssafy.mafiace.db.entity;

import java.util.Collection;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Table(name = "user")
@ToString
@AttributeOverrides({
    @AttributeOverride(name = "id", column = @Column(name = "user_unique_id", unique = true))
})
public class User extends BaseEntity implements UserDetails {

    @NotNull @Size(min = 5, max = 12)
    @Pattern(regexp = "[a-zA-Z0-9]{5,12}")
    @Column(name = "user_id", unique = true)
    String userId;
    @NotNull
    String password;
    @NotNull
    @Column(name = "email", unique = true)
    String email;
    @Pattern(regexp = "[a-zA-Z1-9가-힣\\s]{2,8}")
    @NotNull
    @Column(name = "nickname", unique = true)
    String nickname;
    @Column(name = "is_deleted")
    boolean isDeleted;
    @Transient
    boolean isReady;

    public boolean isReady() {
        return isReady;
    }

    public void setReady(boolean ready) {
        isReady = ready;
    }

    @Builder
    private User(String userId, String password, String email, String nickname) {
        this.id = BaseEntity.shortUUID();
        this.userId = userId;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
    }

    // delete
    public void addDeleteAccount(String userId) {
        if(userId.equals(this.userId)) {
            this.isDeleted = true;
        }
    }

    // restore
    public void restoreAccount(String userId) {
        if(userId.equals(this.userId)) {
            this.isDeleted = false;
        }
    }

    public User modifyUser(String password, String email, String nickname){
        this.password = password;
        this.email = email;
        this.nickname = nickname;

        return this;
    }

    public User modifyPassword(String password){
        this.password = password;

        return this;
    }

    public User modifyNickname(String nickname){
        this.nickname = nickname;

        return this;
    }


    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserGameLog> userGameLogs = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserHonor> userHonors = new ArrayList<>();

    @OneToOne(mappedBy = "user", orphanRemoval = true)
    private DeleteAccount deleteAccount;

    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST, orphanRemoval = true)
    private UserRecords userRecords;

    public void setUserRecords(UserRecords userRecords) {
        this.userRecords = userRecords;
        userRecords.setUser(this);
    }

    public void addUserGameLog(UserGameLog userGameLog) {
        this.userGameLogs.add(userGameLog);
        userGameLog.setUser(this);
    }

    public void addUserHonors(UserHonor userHonor) {
        this.userHonors.add(userHonor);
        userHonor.setUser(this);
    }

    public void setDeleteAccount(DeleteAccount deleteAccount) {
        this.deleteAccount = deleteAccount;
        deleteAccount.setUser(this);
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
