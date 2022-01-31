package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserRepository;
import com.ssafy.mafiace.db.repository.UserRepositorySupport;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

public class UserRecordsServiceImpl implements UserRecordsService{

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    UserRepository userRepository;

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
}
