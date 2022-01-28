package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.UserRegisterPostReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.service.UserService;
import com.ssafy.mafiace.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@CrossOrigin("*")
@Api(value = "유저 API", tags = {"UserController"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserService userService;

    @PostMapping("/register")
    @ApiOperation(value = "회원 가입", notes = "회원가입 정보를 받아서 회원가입을 진행한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원가입 완료"),
    })
    public ResponseEntity<BaseResponseBody> register(@RequestBody @ApiParam(value="회원가입 요청 정보", required = true) UserRegisterPostReq registerReq) {
        userService.registerUser(registerReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 완료"));
    }

    @PatchMapping("/update")
    @ApiOperation(value = "회원정보 수정", notes = "마이페이지에서 회원정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "회원정보 수정 완료"),
    })
    public ResponseEntity<BaseResponseBody> update(@RequestBody @ApiParam(value="회원정보 수정 요청 정보", required = true) UserRegisterPostReq registerReq, @ApiIgnore Authentication authentication) {
        authentication.getDetails();

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원정보 수정완료"));
    }

    @ApiOperation(value = "아이디 중복 체크", notes = "아이디를 전달받아서 중복 체크를 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "사용 가능한 아이디입니다."),
        @ApiResponse(code = 409, message = "중복된 아이디입니다."),
    })
    @GetMapping("/idcheck")
    public ResponseEntity<BaseResponseBody> checkId(@ApiParam(value="유저 아이디", required = true) String userId) {
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
    public ResponseEntity<BaseResponseBody> checkEmail(@ApiParam(value="유저 이메일", required = true) String email) {
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
    public ResponseEntity<BaseResponseBody> checkNickname(@ApiParam(value="유저 닉네임", required = true) String nickname) {
        User user = userService.getUserByNickname(nickname);
        if (user != null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 닉네임입니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 닉네임입니다."));
    }
}
