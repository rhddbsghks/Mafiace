package com.ssafy.mafiace.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
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

    public UserRecords updateUserRecords(Map<String, String> result){
//        이런식으로 기존 record와 현재 record 비교해서 map 에서 string 형태로 받아서 update..
//        User user = userRepository.findByUserId(result의 유저아이디);
//        UserRecords prevUserRecords = userRecordsRepository.findAllById(user.getId());
//        UserRecords nextUserRecords = UserRecords.builder()
//            .id(prevUserRecords.getId())
//            .winCount(result.get(win) ? prevUserRecords.getWinCount()+1 : prevUserRecords.getWinCount())
//            .loseCount(result.get(lose) ? prevUserRecords.getLoseCount()+1 : prevUserRecords.getLoseCount())
//            .mafiaCount()
        return null;
    }

}
