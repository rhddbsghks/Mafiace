package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.DeleteAccount;
import com.ssafy.mafiace.db.entity.QDeleteAccount;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.User;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DeleteAccountRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<DeleteAccount> findDeleteAccountByUser(User user) {
        QDeleteAccount qDeleteAccount = QDeleteAccount.deleteAccount;
        DeleteAccount deleteAccount = jpaQueryFactory.select(qDeleteAccount).from(qDeleteAccount)
            .where(qDeleteAccount.id.eq(user.getId())).fetchOne();

        if (user == null) {
            return Optional.empty();
        }

        return Optional.of(deleteAccount);
    }
}
