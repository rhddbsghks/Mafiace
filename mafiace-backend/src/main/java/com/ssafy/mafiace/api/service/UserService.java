package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.db.entity.User;

public interface UserService {
    User getUserByUserId(String userId);
    User getUserByEmail(String email);
    User getUserByNickname(String nickname);
    User registerUser(UserRegisterPostReq request);
}
