package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserHonor;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.honor.HonorName;
import java.util.List;

public interface UserHonorService {
    void saveHonor(UserRecords userRecords);
    List<HonorName> getUserHonorsByUserUniqueId(String userUniqueId);
}
