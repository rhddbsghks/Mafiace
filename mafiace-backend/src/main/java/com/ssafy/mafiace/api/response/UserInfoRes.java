package com.ssafy.mafiace.api.response;

import com.ssafy.mafiace.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserInfoRes extends BaseResponseBody {

    private String userId;
    private String email;
    private String nickname;
    private String isDeleted;

    public static UserInfoRes of(Integer statusCode, String message, User user) {
        UserInfoRes res = new UserInfoRes();
        res.setStatus(statusCode);
        res.setMessage(message);
        res.setUserId(user.getUserId());
        res.setEmail(user.getEmail());
        res.setNickname(user.getNickname());
        return res;
    }
}