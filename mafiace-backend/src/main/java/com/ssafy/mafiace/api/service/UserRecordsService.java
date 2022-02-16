package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import com.ssafy.mafiace.game.Player;

public interface UserRecordsService {

    UserRecords getUserRecords(String userUniqueId);
    UserRecords addUserRecords(User user);

    UserRecords updateUserRecords(Player player, boolean isWin, String role);
}
