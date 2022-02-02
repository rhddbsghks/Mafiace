package com.ssafy.mafiace.repository;

import com.ssafy.mafiace.MafiaceApplicationTests;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserRepository;
import com.ssafy.mafiace.db.repository.UserRepositorySupport;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class UserRecordsRepositoryTest extends MafiaceApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRepositorySupport userRepositorySupport;

    @Test
    public void createUserRecords(){
        User user = User.builder()
            .userId("najw111")
            .password("12341234")
            .email("ssafy@ssafy.com")
            .build();
        userRepository.save(user);
    }

}
