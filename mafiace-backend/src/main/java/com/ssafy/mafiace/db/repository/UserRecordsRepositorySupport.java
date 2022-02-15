package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.mafiace.db.entity.QUser;
import com.ssafy.mafiace.db.entity.QUserGameLog;
import com.ssafy.mafiace.db.entity.QUserRecords;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserGameLog;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.List;
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

    @Autowired
    private UserGameLogRepositorySupport userGameLogRepositorySupport;

    private QUserRecords qUserRecords = QUserRecords.userRecords;
    private QUser qUser = QUser.user;
    private QUserGameLog qUserGameLog = QUserGameLog.userGameLog;



    // 0 반환 => 실패
    // 1 반환 => 성공
    public UserRecords updateUserRecords(String nickname, boolean isWin, int killCount,
        int saveCount, int investigateCount, String role){
//        이런식으로 기존 record와 현재 record 비교해서 map 에서 string 형태로 받아서 update..
        User user = userRepository.findByNickname(nickname).get();
        if(user == null) return null;
        UserRecords prevUserRecords = userRecordsRepository.findById(user.getId()).get();
        int winCount = 0;
        int loseCount = 0;
        List<UserGameLog> userGameLogList
            = userGameLogRepositorySupport.getUserGameLogs(user.getId());
        for(UserGameLog userGameLog : userGameLogList){
            if(userGameLog.isWin()) winCount +=1;
            else loseCount +=1;
        }
        prevUserRecords.addCount(investigateCount, killCount, saveCount, isWin, role);
        return userRecordsRepository.save(prevUserRecords);
    }

}
