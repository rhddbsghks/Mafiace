package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import com.ssafy.mafiace.db.repository.UserRepositorySupport;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRecordsServiceImpl implements UserRecordsService{

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRecordsRepositorySupport userRecordsRepositorySupport;

    @Autowired
    UserRecordsRepository userRecordsRepository;

    @Override
    public UserRecords getUserRecords(String id) {
        Optional<User> user = userRepository.findByUserId(id);
        if(user == null){
            return null;
        }
        Optional<UserRecords> userRecordsOpt =
            userRepositorySupport.findUserRecordsByUser(user.get());
        return userRecordsOpt.orElse(null);
    }

    @Override
    public UserRecords addUserRecords(User user) {

        UserRecords userRecords = UserRecords.builder()
                .build();
        user.setUserRecords(userRecords);
        System.out.println("id : "+ userRecords.getId());
        System.out.println("wincount : "+ userRecords.getWinCount());
        System.out.println("userid : "+ userRecords.getUser().getUserId());
        return userRecordsRepository.save(userRecords);
    }


}
