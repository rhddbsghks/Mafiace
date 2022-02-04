package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.DeleteAccountReq;
import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.response.UserInfoRes;
import com.ssafy.mafiace.api.service.EmailService;
import com.ssafy.mafiace.api.service.UserRecordsService;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.common.auth.JwtTokenProvider;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.entity.UserRecords;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@Api(value = "유저 API", tags = {"UserController"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    UserRecordsService userRecordsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    @ApiOperation(value = "회원 가입", notes = "회원가입 정보를 받아서 회원가입을 진행한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원가입이 완료되었습니다."),
        @ApiResponse(code = 409, message = "중복된 계정입니다."),
        @ApiResponse(code = 410, message = "올바르지 않은 패스워드입니다.")
    })
    public ResponseEntity<BaseResponseBody> register(
        @RequestBody @ApiParam(value = "회원가입 요청 정보", required = true) UserRegisterPostReq registerReq) {
        try {
            User user = userService.registerUser(registerReq);
            UserRecords userRecords = userRecordsService.addUserRecords(user);
            if (user != null) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입이 완료되었습니다."));
            } else {
                return ResponseEntity.status(410)
                    .body(BaseResponseBody.of(410, "올바르지 않은 패스워드입니다."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 계정입니다."));
        }
    }

    @PatchMapping
    @ApiOperation(value = "회원정보 수정", notes = "마이페이지에서 회원정보를 수정한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원정보 수정 완료"),
        @ApiResponse(code = 409, message = "중복된 계정입니다."),
        @ApiResponse(code = 410, message = "회원 수정에 실패하였습니다.")
    })
    public ResponseEntity<BaseResponseBody> update(
        @RequestBody @ApiParam(value = "회원정보 수정 요청 정보", required = true) UserRegisterPostReq registerReq) {
        try {
            User user = userService.updateUser(registerReq);
            if (user != null) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원정보 수정완료"));
            } else {
                return ResponseEntity.status(410)
                    .body(BaseResponseBody.of(410, "올바르지 않은 패스워드입니다."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "회원 수정에 실패하였습니다."));
        }
    }

    @ApiOperation(value = "아이디 중복 체크", notes = "아이디를 전달받아서 중복 체크를 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "사용 가능한 아이디입니다."),
        @ApiResponse(code = 409, message = "중복된 아이디입니다."),
    })
    @GetMapping("/idcheck")
    public ResponseEntity<BaseResponseBody> checkId(
        @ApiParam(value = "유저 아이디", required = true) String userId) {
        User user = userService.getUserByUserId(userId);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 아이디입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 아이디입니다."));
    }

    @ApiOperation(value = "이메일 중복 체크", notes = "이메일을 전달받아서 중복 체크를 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "사용 가능한 이메일입니다."),
        @ApiResponse(code = 409, message = "중복된 이메일입니다."),
    })
    @GetMapping("/emailcheck")
    public ResponseEntity<BaseResponseBody> checkEmail(
        @ApiParam(value = "유저 이메일", required = true) String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 이메일입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 이메일입니다."));
    }

    @ApiOperation(value = "닉네임 중복 체크", notes = "닉네임을 전달받아서 중복 체크를 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "사용 가능한 닉네임입니다."),
        @ApiResponse(code = 409, message = "중복된 닉네임입니다."),
    })
    @GetMapping("/nicknamecheck")
    public ResponseEntity<BaseResponseBody> checkNickname(
        @ApiParam(value = "유저 닉네임", required = true) String nickname) {
        User user = userService.getUserByNickname(nickname);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 닉네임입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 닉네임입니다."));
    }

    @ApiOperation(value = "비밀번호 찾기", notes = "아이디와 이메일을 입력받아서 임시 비밀번호를 해당 이메일로 전송한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "메일 전송이 완료되었습니다."),
        @ApiResponse(code = 404, message = "해당 계정이 존재하지 않습니다."),
        @ApiResponse(code = 500, message = "예기치 못한 오류가 발생하였습니다."),
    })
    @PatchMapping("/password")
    public ResponseEntity<BaseResponseBody> findPassword(
        @RequestBody UserRegisterPostReq registerReq) {
        User user = userService.getUserByUserIdAndEmail(registerReq.getUserId(),
            registerReq.getEmail());
        if (user != null) {
            try {
                String tmpPassword = emailService.createPassword();
                emailService.sendPasswordToEmail(registerReq.getEmail(), tmpPassword);
                userService.changePassword(user, tmpPassword);
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "메일 전송이 완료되었습니다."));
            } catch (Exception e) {
                return ResponseEntity.status(500)
                    .body(BaseResponseBody.of(500, "예기치 못한 오류가 발생하였습니다."));
            }
        }
        return ResponseEntity.status(404)
            .body(BaseResponseBody.of(404, "해당 계정이 존재하지 않습니다."));
    }

    @PostMapping("/deleteaccount")
    @ApiOperation(value = "회원 탈퇴", notes = "비밀번호를 확인한 뒤 회원 탈퇴 신청을 진행한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원 탈퇴 신청이 완료되었습니다."),
        @ApiResponse(code = 400, message = "이미 탈퇴 신청된 계정입니다."),
        @ApiResponse(code = 401, message = "비밀번호가 틀렸습니다.")
    })
    public ResponseEntity<BaseResponseBody> deleteAccount
        (@RequestBody @ApiParam(value="회원 탈퇴 신청 요청 정보", required = true) DeleteAccountReq deleteAccountReq) {
        User user = userService.getUserByUserId((deleteAccountReq.getUserId()));

        if (user.isDeleted()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미 탈퇴 신청된 계정입니다."));
        }

        if (passwordEncoder.matches(deleteAccountReq.getPassword(), user.getPassword())) {
            userService.deleteAccount(user);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 탈퇴 신청이 완료되었습니다."));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "비밀번호가 틀렸습니다."));
    }

    @PostMapping("/restoreaccount")
    @ApiOperation(value = "회원 탈퇴 취소", notes = "비밀번호를 확인한 뒤 회원 탈퇴 신청을 취소한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원 탈퇴 신청이 취소되었습니다."),
        @ApiResponse(code = 400, message = "탈퇴 신청된 계정이 아닙니다."),
        @ApiResponse(code = 401, message = "비밀번호가 틀렸습니다.")
    })
    public ResponseEntity<BaseResponseBody> restoreAccount
        (@RequestBody @ApiParam(value="회원 탈퇴 취소 요청 정보", required = true) DeleteAccountReq deleteAccountReq) {
        User user = userService.getUserByUserId((deleteAccountReq.getUserId()));

        if (!user.isDeleted()) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "탈퇴 신청된 계정이 아닙니다."));
        }

        if (passwordEncoder.matches(deleteAccountReq.getPassword(), user.getPassword())) {
            userService.restoreAccount(user);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원 탈퇴 신청이 취소되었습니다."));
        }

        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "비밀번호가 틀렸습니다."));
    }


    @ApiOperation(value = "내 계정 정보", notes = "현재 로그인한 ID정보를 반환한다")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 409, message = "실패"),
    })
    @PostMapping("/userinfo")
    public ResponseEntity<UserInfoRes> getUserInfo(HttpServletRequest request) {
        String jwtToken = request.getHeader("Authorization").substring(7);
        String userId = jwtTokenProvider.getUserPk(jwtToken);
        System.err.println(userId);
        User user = userService.getUserByUserId(userId);
        System.err.println(user.getUsername());
        if (user != null) {
            return ResponseEntity.status(200).body(UserInfoRes.of(200, "성공", user));
        }
        return ResponseEntity.status(409).body(UserInfoRes.of(409, "실패", null));
    }
}
