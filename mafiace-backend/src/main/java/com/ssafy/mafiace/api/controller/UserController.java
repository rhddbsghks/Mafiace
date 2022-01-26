package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.common.util.db.entity.User;
import com.ssafy.mafiace.common.util.db.repository.UserRepository;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    // 회원가입
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> user) {
        Optional<User> member = userRepository.findByuserId(user.get("userId"));
        if (member.isPresent()) {
            return "fail";
        } else {
            return userRepository.save(User.builder()
                .userId(user.get("userId"))
                .password(passwordEncoder.encode(user.get("password")))
                .build()).getId();
        }
    }
}
