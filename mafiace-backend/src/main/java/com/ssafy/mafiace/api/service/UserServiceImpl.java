package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User getUserByUserId(String userId) {
        Optional<User> opt = userRepository.findByUserId(userId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public User registerUser(UserRegisterPostReq request) {
        return userRepository.save(User.builder()
            .userId(request.getUserId())
            .password(passwordEncoder.encode(request.getPassword()))
            .email(request.getEmail())
            .nickname(request.getNickname())
            .build());
    }
}
