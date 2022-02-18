package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserRecords;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<UserRecords> findUserRecordsByUser(User user) {
        QUserRecords qUserRecords = QUserRecords.userRecords;
        UserRecords userRecords = jpaQueryFactory.select(qUserRecords).from(qUserRecords)
            .where(qUserRecords.id.eq(user.getId())).fetchOne();
        if (user == null) {
            return Optional.empty();
        }
        return Optional.of(userRecords);
    }
}
