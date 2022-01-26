package com.ssafy.mafiace.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginPostReq {
    String userId;
    String password;
}