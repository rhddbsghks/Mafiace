package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserHonorRepository;
import com.ssafy.mafiace.db.repository.UserHonorRepositorySupport;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserHonorServiceImpl implements UserHonorService {

    @Autowired
    UserHonorRepository userHonorRepository;

    @Autowired
    UserHonorRepositorySupport userHonorRepositorySupport;

    public void saveHonor(UserRecords userRecords) {
        User user = userRecords.getUser();
        List<HonorName> achievedHonors = userHonorRepositorySupport.getUserHonor(user.getId())
            .stream().map(UserHonor::getHonorNo).collect(Collectors.toList());  // 이미 달성한 업적
        List<HonorName> newAchievedHonors = new ArrayList<>();

        // 첫 승 (0)
        if (userRecords.getWinCount() == 1) {
            newAchievedHonors.add(HonorName.firstWin);
        }
        // 연승 (1~2)
        if (userRecords.getWinnerStreak() == 3) {
            newAchievedHonors.add(HonorName.win3Streak);
        } else if (userRecords.getWinnerStreak() == 5) {
            newAchievedHonors.add(HonorName.win5Streak);
        }
        // 10번 살림 (3)
        if (userRecords.getSaveCount() == 10) {
            newAchievedHonors.add(HonorName.save10);
        }
        // 10번 조사 (4)
        if (userRecords.getInvestigateCount() == 10) {
            newAchievedHonors.add(HonorName.investigate10);
        }
        // 마피아 플레이 횟수 (5~6)
        if (userRecords.getMafiaCount() == 3) {
            newAchievedHonors.add(HonorName.mafia3Play);
        } else if (userRecords.getMafiaCount() == 10) {
            newAchievedHonors.add(HonorName.mafia10Play);
        }
        // 의사 플레이 횟수 (7~8)
        if (userRecords.getDoctorCount() == 3) {
            newAchievedHonors.add(HonorName.doctor3Play);
        } else if (userRecords.getDoctorCount() == 10) {
            newAchievedHonors.add(HonorName.doctor10Play);
        }
        // 경찰 플레이 횟수 (9~10)
        if (userRecords.getPoliceCount() == 3) {
            newAchievedHonors.add(HonorName.police3Play);
        } else if (userRecords.getMafiaCount() == 10) {
            newAchievedHonors.add(HonorName.police10Play);
        }

        // 업적 저장
        for (HonorName newAchievedHonor: newAchievedHonors) {
            if (!achievedHonors.contains(newAchievedHonor)) {
                userHonorRepository.save(UserHonor.builder()
                    .honorNo(newAchievedHonor)
                    .user(user)
                    .build());
            }
        }
    }
}
