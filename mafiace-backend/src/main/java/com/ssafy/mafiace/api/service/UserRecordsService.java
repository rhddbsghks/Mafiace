package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.Player;

public interface UserRecordsService {

    UserRecords getUserRecords(String id);
    UserRecords addUserRecords(User user);

    void updateUserRecords(Player player, boolean isWin);
}
