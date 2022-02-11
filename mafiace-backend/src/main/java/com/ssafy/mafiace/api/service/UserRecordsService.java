package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;

public interface UserRecordsService {

    UserRecords getUserRecords(String id);
    UserRecords addUserRecords(User user);
}
