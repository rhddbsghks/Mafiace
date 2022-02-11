package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import java.util.Map;

public interface UserRecordsService {

    UserRecords getUserRecords(String id);

    UserRecords addUserRecords(User user);

    void userUpdateUserRecords(Map<String, String> gameLog);
}
