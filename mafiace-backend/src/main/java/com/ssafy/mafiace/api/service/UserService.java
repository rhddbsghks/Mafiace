package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;

public interface UserService {
    User getUserByUserId(String userId);
    User getUserByEmail(String email);
    User getUserByNickname(String nickname);
    User getUserByUserIdAndEmail(String userId, String email);

    User registerUser(UserRegisterPostReq request);
    User updateUser(UserRegisterPostReq registerReq);
    User changePassword(User user, String tmpPassword);


}
