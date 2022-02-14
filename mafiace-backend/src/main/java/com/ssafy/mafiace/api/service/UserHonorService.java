package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.honor.HonorName;

public interface UserHonorService {
    void saveHonor(UserRecords userRecords);
}
