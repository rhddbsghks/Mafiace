package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
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
        userService.registerUser(registerReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 완료"));
    }

    // 아이디 중복 체크
    @GetMapping("/idcheck")
    public ResponseEntity<BaseResponseBody> checkId(@RequestBody String userId) {
        User user = userService.getUserByUserId(userId);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 아이디입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 아이디입니다."));
    }

    // 이메일 중복 체크
    @GetMapping("/emailcheck")
    public ResponseEntity<BaseResponseBody> checkEmail(@RequestBody String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 이메일입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 이메일입니다."));
    }

    // 닉네임 중복 체크
    @GetMapping("/nicknamecheck")
    public ResponseEntity<BaseResponseBody> checkNickname(@RequestBody String nickname) {
        User user = userService.getUserByNickname(nickname);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 닉네임입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 닉네임입니다."));
    }
}
