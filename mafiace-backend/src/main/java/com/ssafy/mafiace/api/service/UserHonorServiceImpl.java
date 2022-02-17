package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.db.repository.UserHonorRepository;
import com.ssafy.mafiace.db.repository.UserHonorRepositorySupport;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.ArrayList;
import java.util.List;
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
        List<HonorName> achievedHonors = getUserHonorsByUserUniqueId(user.getId());  // 이미 달성한 업적
        List<HonorName> newAchievedHonors = new ArrayList<>();

        // 첫 승 (0)
        if (!achievedHonors.contains(HonorName.firstWin) && userRecords.getWinCount() >= 1) {
            newAchievedHonors.add(HonorName.firstWin);
        }

        // 10번 죽임 (3)
        if (!achievedHonors.contains(HonorName.kill10) && userRecords.getKillCount() >= 10) {
            newAchievedHonors.add(HonorName.kill10);
        }
        // 10번 살림 (4)
        if (!achievedHonors.contains(HonorName.save10) && userRecords.getSaveCount() >= 10) {
            newAchievedHonors.add(HonorName.save10);
        }
        // 10번 조사 (5)
        if (!achievedHonors.contains(HonorName.investigate10) && userRecords.getInvestigateCount() >= 10) {
            newAchievedHonors.add(HonorName.investigate10);
        }
        // 마피아 플레이 횟수 (6~7)
        if (!achievedHonors.contains(HonorName.mafia3Play) && userRecords.getMafiaCount() >= 3) {
            newAchievedHonors.add(HonorName.mafia3Play);
        }
        if (!achievedHonors.contains(HonorName.mafia10Play) && userRecords.getMafiaCount() >= 10) {
            newAchievedHonors.add(HonorName.mafia10Play);
        }
        // 의사 플레이 횟수 (8~9)
        if (!achievedHonors.contains(HonorName.doctor3Play) && userRecords.getDoctorCount() >= 3) {
            newAchievedHonors.add(HonorName.doctor3Play);
        }
        if (!achievedHonors.contains(HonorName.doctor10Play) && userRecords.getDoctorCount() >= 10) {
            newAchievedHonors.add(HonorName.doctor10Play);
        }
            // 경찰 플레이 횟수 (10~11)
        if (!achievedHonors.contains(HonorName.police3Play) && userRecords.getPoliceCount() >= 3) {
            newAchievedHonors.add(HonorName.police3Play);
        }
        if (!achievedHonors.contains(HonorName.police10Play) &&  userRecords.getPoliceCount() >= 10) {
            newAchievedHonors.add(HonorName.police10Play);
        }
        // 시민 플레이 횟수 (12~13)
        if (!achievedHonors.contains(HonorName.citizen3Play) && userRecords.getCitizenCount() >= 3) {
            newAchievedHonors.add(HonorName.citizen3Play);
        }
        if (!achievedHonors.contains(HonorName.citizen10Play) &&  userRecords.getCitizenCount() >= 10) {
            newAchievedHonors.add(HonorName.citizen10Play);
        }

        // 업적 저장
        for (HonorName newAchievedHonor : newAchievedHonors) {
            userHonorRepository.save(UserHonor.builder()
                .honorNo(newAchievedHonor)
                .user(user)
                .build()
            );
        }
    }


    @Override
    public List<HonorName> getUserHonorsByUserUniqueId(String userUniqueId) {
        return userHonorRepositorySupport.getUserHonorsByUserUniqueId(userUniqueId);
    }
}
