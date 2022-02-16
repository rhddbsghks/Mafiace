package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserHonor;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserHonorRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    private QUser qUser = QUser.user;
    private QUserHonor qUserHonor = QUserHonor.userHonor;

    public List<HonorName> getUserHonorsByUserUniqueId(String userUniqueId) {
        return this.jpaQueryFactory
            .select(qUserHonor.honorNo)
            .from(qUserHonor)
            .where(qUserHonor.user.id.eq(userUniqueId))
            .fetch();
    }

}
