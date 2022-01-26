package com.ssafy.mafiace.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterPostReq {
    String userId;
    String password;
    String email;
    String nickname;
}
