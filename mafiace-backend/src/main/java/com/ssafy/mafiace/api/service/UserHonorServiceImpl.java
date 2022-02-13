package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserHonorRepository;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHonorServiceImpl implements UserHonorService {

    @Autowired
    UserHonorRepository userHonorRepository;

    public void saveHonor(UserRecords userRecords) {
        User user = userRecords.getUser();
        List<HonorName> achievedHonors = new ArrayList<>();

        // 첫 승 (0)
        if (userRecords.getWinCount() == 1) {
            achievedHonors.add(HonorName.firstWin);
        }
        // 연승 (1~2)
        if (userRecords.getWinnerStreak() == 3) {
            achievedHonors.add(HonorName.win3Streak);
        } else if (userRecords.getWinnerStreak() == 5) {
            achievedHonors.add(HonorName.win5Streak);
        }
        // 10번 살림 (3)
        if (userRecords.getSaveCount() == 10) {
            achievedHonors.add(HonorName.save10);
        }
        // 10번 조사 (4)
        if (userRecords.getInvestigateCount() == 10) {
            achievedHonors.add(HonorName.investigate10);
        }

        // 업적 저장
        for (HonorName achievedHonor: achievedHonors) {
            if (!isAchieved(user, achievedHonor)) {
                userHonorRepository.save(UserHonor.builder()
                    .honorNo(achievedHonor)
                    .user(user)
                    .build());
            }
        }
    }

    public boolean isAchieved(User user, HonorName honorNo) {
        if (userHonorRepository.findByUserAndHonorNo(user, honorNo).isPresent()) {
            return true;
        }
        return false;
    }
}
