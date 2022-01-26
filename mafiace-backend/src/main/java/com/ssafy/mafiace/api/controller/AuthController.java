package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.UserLoginPostReq;
import com.ssafy.mafiace.api.response.UserLoginPostRes;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.common.auth.JwtTokenProvider;
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
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<UserLoginPostRes> login(@RequestBody UserLoginPostReq loginReq) {
        User user = userService.getUserByUserId(loginReq.getUserId());

        // 존재하지 않은 아이디인 경우, 404로 응답.
        if (user == null) {
            return ResponseEntity.status(404)
                .body(UserLoginPostRes.of(404, "존재하지 않는 계정입니다.", null));
        }

        // 입력된 비밀번호와 디비에 저장된 유저의 암호화된 비밀번호가 같은지 확인
        if (passwordEncoder.matches(loginReq.getPassword(), user.getPassword())) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
            return ResponseEntity.ok(
                UserLoginPostRes.of(200, "Success",
                    jwtTokenProvider.createToken(user.getUserId())));
        }
        // 잘못된 비밀번호인 경우, 401로 응답
        else {
            return ResponseEntity.status(401)
                .body(UserLoginPostRes.of(401, "비밀번호가 틀렸습니다.", null));
        }
    }
}