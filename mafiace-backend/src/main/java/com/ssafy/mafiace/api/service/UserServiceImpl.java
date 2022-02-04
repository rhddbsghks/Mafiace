package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.db.entity.DeleteAccount;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.DeleteAccountRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRecordsRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import com.ssafy.mafiace.db.repository.DeleteAccountRepository;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRecordsRepositorySupport userRecordsRepositorySupport;

    @Autowired
    DeleteAccountRepository deleteAccountRepository;

    @Autowired
    DeleteAccountRepositorySupport deleteAccountRepositorySupport;

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
    public User getUserByEmail(String email) {
        Optional<User> opt = userRepository.findByEmail(email);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public User getUserByNickname(String nickname) {
        Optional<User> opt = userRepository.findByNickname(nickname);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public User getUserByUserIdAndEmail(String userId, String email) {
        Optional<User> opt = userRepository.findByUserIdAndEmail(userId, email);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            return null;
        }
    }

    @Override
    public User registerUser(UserRegisterPostReq request) {
        if (request.getPassword().length() < 8 || request.getPassword().length() > 12) {
            return null;
        }
        User user = userRepository.save(User.builder()
            .userId(request.getUserId())
            .password(passwordEncoder.encode(request.getPassword()))
            .email(request.getEmail())
            .nickname(request.getNickname())
            .build()
        );

        return user;
    }

    @Override
    public User updateUser(UserRegisterPostReq registerReq) {
        if (registerReq.getPassword().length() < 8 || registerReq.getPassword().length() > 12) {
            return null;
        }
        User user = getUserByUserId(registerReq.getUserId());

        return userRepository.save(
            user.modifyUser(passwordEncoder.encode(registerReq.getPassword()),
                registerReq.getEmail(), registerReq.getNickname()));
    }

    @Override
    public User changePassword(User user, String tmpPassword) {
        if (tmpPassword.length() < 8 || tmpPassword.length() > 12) {
            return null;
        }
        return userRepository.save(
            user.modifyUser(passwordEncoder.encode(tmpPassword), user.getEmail(),
                user.getNickname()));
    }

    @Override
    public User deleteAccount(User user) {
        DeleteAccount deleteAccount = DeleteAccount.builder()
            .requestDate(LocalDate.now())
            .finishDate(LocalDate.now().plusDays(30))
            .build();

        user.setDeleteAccount(deleteAccount);
        user.adddeleteAccount(user.getUserId());
        deleteAccountRepository.save(deleteAccount);
        return userRepository.save(user);
    }

    @Override
    public User restoreAccount(User user) {
        Optional<DeleteAccount> deleteAccount = deleteAccountRepositorySupport.findDeleteAccountByUser(user);

        if (deleteAccount.isPresent()) {
                deleteAccountRepository.deleteById(deleteAccount.get().getId());
        }

        user.restoreAccount(user.getUserId());  // 유저의 탈퇴 여부를 false로 변경
        return userRepository.save(user);
    }

    @Override
    public User getUserById(String Id){
        Optional<User> user = userRepository.findById(Id);
        if(user.isPresent()) return user.get();
        return null;

    }

}
