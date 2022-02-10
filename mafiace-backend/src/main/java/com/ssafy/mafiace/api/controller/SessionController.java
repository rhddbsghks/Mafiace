package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.common.model.NewSessionInfo;
import com.ssafy.mafiace.api.response.SessionTokenPostRes;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.common.auth.JwtTokenProvider;
import com.ssafy.mafiace.db.manager.MafiaceManager;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "세션 관리 API", tags = {"SessionController"})
@RestController
@RequestMapping("/api/session")
public class SessionController {

    private SessionService sessionService;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private GameController gameController;

    public SessionController(SessionService sessionService, JwtTokenProvider jwtTokenProvider) {
        this.sessionService = sessionService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/token")
    @ApiOperation(value = "세션방 생성", notes = "생성된 방 번호의 토큰 제공")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 500, message = "Server Error"),
    })
    public ResponseEntity<SessionTokenPostRes> openSession(HttpServletRequest request,
        @RequestBody SessionOpenReq sessionOpenReq) {
        String jwtToken = request.getHeader("Authorization").substring(7);
        String nickname = jwtTokenProvider.getUserNickname(jwtToken);
        try {
            NewSessionInfo info = sessionService.openSession(nickname, sessionOpenReq);
            // Return the response to the client
            return ResponseEntity.status(201)
                .body(SessionTokenPostRes.of(201, "Success", info));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(SessionTokenPostRes.of(500, "Server Error", null));
        }
    }

    @GetMapping("/token")
    @ApiOperation(value = "세션방 토큰 얻기", notes = "해당하는 방 번호의 토큰 제공")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 404, message = "존재하지 않는 방"),
    })
    public ResponseEntity<SessionTokenPostRes> getToken(
        @ApiParam(value = "세션방 ID", required = true) String sessionName, HttpServletRequest request) {

        if(!sessionService.isExist(sessionName))
            return ResponseEntity.status(404)
                .body(SessionTokenPostRes.of(404, "해당하는 세션방 없음", null));

        if(sessionService.isFull(sessionName))
            return ResponseEntity.status(409)
                .body(SessionTokenPostRes.of(409, "인원 가득 찼음", null));

        // Build connectionProperties object with the serverData and the role
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).build();

        // Session already exists
        System.out.println("Existing session " + sessionName);
        try {
            // Generate a new Connection with the recently created connectionProperties
            String jwtToken = request.getHeader("Authorization").substring(7);
            String nickname = jwtTokenProvider.getUserNickname(jwtToken);
            String token = sessionService.getToken(sessionName, nickname);
            //this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
            System.err.println(token);
            // Return the response to the client
            return ResponseEntity.status(201)
                .body(
                    SessionTokenPostRes.of(201, "Success", NewSessionInfo.of(token, sessionName)));
        } catch (Exception e) {

            sessionService.isExist(sessionName);

            return ResponseEntity.status(404)
                .body(SessionTokenPostRes.of(404, "서버에러 방없음", null));
        }
    }

    @DeleteMapping("")
    @ApiOperation(value = "세션방 삭제", notes = "해당하는 방 번호 삭제")
    @ApiResponses({
        @ApiResponse(code = 204, message = "성공"),
    })
    public ResponseEntity<BaseResponseBody> deleteSession(String sessionName) {
        try {
            sessionService.closeSession(sessionName);
            return ResponseEntity.status(204)
                .body(BaseResponseBody.of(204, "Success"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(BaseResponseBody.of(500, "Server Error"));
        }
    }

    // 세션 떠나기 요청 필요
    @DeleteMapping("/user")
    @ApiOperation(value = "세션방 나가기", notes = "해당하는 방에서 나가기")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
    })
    public ResponseEntity<BaseResponseBody> leaveSession(String sessionName, HttpServletRequest request) {
        try {
            String jwtToken = request.getHeader("Authorization").substring(7); // Id -> 닉네임으로 변경
            String nickname = jwtTokenProvider.getUserNickname(jwtToken);
            sessionService.leaveSession(sessionName, nickname);
            return ResponseEntity.status(200)
                .body(BaseResponseBody.of(200, "Success"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(BaseResponseBody.of(500, "Server Error"));
        }
    }

    // 게임 방 Ready
    @GetMapping("/Ready")
    @ApiOperation(value = "게임 방 레디", notes = "준비 완료하기")
    @ApiResponses({
        @ApiResponse(code = 204, message = "성공"),
        @ApiResponse(code = 501, message = "Logic Error"),

    })
    public ResponseEntity<BaseResponseBody> toggleReady(String sessionName, HttpServletRequest request){
        try {
            String jwtToken = request.getHeader("Authorization").substring(7);
            String nickname = jwtTokenProvider.getUserNickname(jwtToken);
            if(!sessionService.toggleReady(sessionName, nickname))
                return ResponseEntity.status(501)
                .body(BaseResponseBody.of(501, "Logic Error"));
            return ResponseEntity.status(204)
                .body(BaseResponseBody.of(204, "Success"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(BaseResponseBody.of(500, "Server Error"));
        }
    }
}
