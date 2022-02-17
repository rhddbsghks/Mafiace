package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserRecordsRepository;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import com.ssafy.mafiace.db.repository.UserRepositorySupport;
import com.ssafy.mafiace.game.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserRecordsServiceImpl implements UserRecordsService {

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRecordsRepositorySupport userRecordsRepositorySupport;

    @Autowired
    UserRecordsRepository userRecordsRepository;

    @Override
    public UserRecords getUserRecords(String userUniqueId) {
        return userRecordsRepositorySupport.findByUserUniqueId(userUniqueId);
    }

    @Override
    public UserRecords addUserRecords(User user) {

        UserRecords userRecords = UserRecords.builder()
            .user(user)
            .build();
        return userRecordsRepository.save(userRecords);
    }

    @Override
    public UserRecords updateUserRecords(Player player, boolean isWin, String role) {
        // 유저, 승,패, 직업별 기능 사용 횟수 저장
        return userRecordsRepositorySupport.updateUserRecords(player.getNickname() ,isWin, player.getKillCount(), player.getSaveCount(), player.getInvestigateCount(), role);
    }


}
