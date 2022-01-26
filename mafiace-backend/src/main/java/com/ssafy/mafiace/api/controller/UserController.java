package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.UserRepository;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> register(@RequestBody UserRegisterPostReq registerReq) {
        User user = userService.getUserByUserId(registerReq.getUserId());
        if(user==null){
            userService.registerUser(registerReq);
            return new ResponseEntity<String>("Success", HttpStatus.OK);
        }
        return new ResponseEntity<String>("이미 가입된 아이디입니다.", HttpStatus.CONFLICT);
    }
}
