package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QUserRecords;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.role.RoleName;
import java.util.Map;
import java.util.Optional;
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
    public long updateUserRecords(Map<String, String> gameLog){
//        이런식으로 기존 record와 현재 record 비교해서 map 에서 string 형태로 받아서 update..
        User user = userRepository.findByUserId(gameLog.get("userId")).get();
        if(user == null) return 0;
        UserRecords prevUserRecords = userRecordsRepository.findById(user.getId()).get();
        String role = gameLog.get("Role");
        if(role.equals("Mafia")){
            prevUserRecords.setKillCount(
                prevUserRecords.getKillCount()+Integer.parseInt(gameLog.get("killCount"))
                );

        }else if(role.equals("Doctor")){
            prevUserRecords.setSaveCount(
                prevUserRecords.getSaveCount()+Integer.parseInt(gameLog.get("saveCount"))
            );
        }else if(role.equals("Police")){
            prevUserRecords.setInvestigateCount(
                prevUserRecords.getInvestigateCount()+Integer.parseInt(gameLog.get("investigateCount"))
            );
        }
        long[] winLose = gameLogRepositorySupport.getUserTotalRecord(user);
        int winCount = (int)winLose[0];
        int loseCount =(int)winLose[1];

        long execute =
            jpaQueryFactory
                .update(qUserRecords)
                .set(qUserRecords.winCount, winCount)
                .set(qUserRecords.loseCount,loseCount)
                .set(qUserRecords.killCount, prevUserRecords.getKillCount())
                .set(qUserRecords.saveCount, prevUserRecords.getSaveCount())
                .set(qUserRecords.investigateCount, prevUserRecords.getInvestigateCount())
                .where(qUserRecords.id.eq(user.getId()))
                .execute();

        return execute;
    }

}
