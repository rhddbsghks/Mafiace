package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<BaseResponseBody> register(@RequestBody UserRegisterPostReq registerReq) {
        User user = userService.getUserByUserId(registerReq.getUserId());
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 아이디입니다."));
        }

        user = userService.getUserByEmail(registerReq.getEmail());
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 이메일입니다."));
        }

        user = userService.getUserByNickname(registerReq.getNickname());
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 닉네임입니다."));
        }

        userService.registerUser(registerReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }
}
