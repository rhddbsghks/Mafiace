package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QUserRecords;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRecordsRepositorySupport {

    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    @Autowired
    private UserRecordsRepository userRecordsRepository;

    @Autowired
    private GameLogRepositorySupport gameLogRepositorySupport;

    @Autowired
    private UserRepository userRepository;

    private QUserRecords qUserRecords = QUserRecords.userRecords;


    // 0 반환 => 실패
    // 1 반환 => 성공
    public long updateUserRecords(String nickname, boolean isWin, int killCount, int saveCount, int investigateCount){
//        이런식으로 기존 record와 현재 record 비교해서 map 에서 string 형태로 받아서 update..
        User user = userRepository.findByNickname(nickname).get();
        if(user == null) return 0;
        UserRecords prevUserRecords = userRecordsRepository.findById(user.getId()).get();

        long[] winLose = gameLogRepositorySupport.getUserTotalRecord(user);
        int winCount = (int)winLose[0];
        int loseCount =(int)winLose[1];

        long execute =
            jpaQueryFactory
                .update(qUserRecords)
                .set(qUserRecords.winCount, winCount + (isWin ? 1 : 0))
                .set(qUserRecords.loseCount,loseCount + (isWin ? 0 : 1))
                .set(qUserRecords.killCount, prevUserRecords.getKillCount()+killCount)
                .set(qUserRecords.saveCount, prevUserRecords.getSaveCount()+saveCount)
                .set(qUserRecords.investigateCount, prevUserRecords.getInvestigateCount()+investigateCount)
                .where(qUserRecords.id.eq(user.getNickname()))
                .execute();

        return execute;
    }

}
