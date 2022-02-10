package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.response.GameRoomRes;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.common.model.GameInfo;
import com.ssafy.mafiace.common.model.Message;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.manager.MafiaceManager;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@Api(value = "게임 방 관리 API", tags = {"GameController"})
@RestController
@RequestMapping("/api/game")
public class GameController {

    private GameService gameService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private Map<String, MafiaceManager> gameManagerMap;

    @Autowired
    private SessionService sessionService;

    @PostConstruct
    public void init() {
        gameManagerMap = new ConcurrentHashMap<>();
    }

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("")
    @ApiOperation(value = "게임방 목록 조회")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 500, message = "Server Error"),
    })
    public ResponseEntity<GameRoomRes> getGameList(int maxPlayer, int isPublic) {
        List<GameInfo> gameInfoList = new ArrayList<>();

        List<Game> list = gameService.getGameList(maxPlayer, isPublic);
        for (Game game : list) {
            game.setPassword("");
            gameInfoList.add(GameInfo.of(game, sessionService.getParticipantCount(game.getId())));
        }

        return ResponseEntity.status(200)
            .body(GameRoomRes.of(200, "Success", gameInfoList));
    }


    @GetMapping("/checkpw")

    public ResponseEntity<BaseResponseBody> checkPassword(String sessionName, String password) {

        if(gameService.checkPassword(sessionName,password))
            return ResponseEntity.status(200)
                .body(BaseResponseBody.of(200, "입장하라"));

        return ResponseEntity.status(401)
            .body(BaseResponseBody.of(401, "비밀번호 불일치치"));
   }

    // 모든 사람이 레디했을 때 요청 ( game start 버튼 활성화 )
    public void allReadyBroadcasting(String roomId) {
        simpMessagingTemplate.convertAndSend("/from/mafiace/allReady/" + roomId, true);
    }

    // 게임 시작
    @MessageMapping("/start/{roomId}") // 발행경로
    @SendTo("/topic/{roomId}") // 구독경로
    public void gameStartBroadcasting(@DestinationVariable String roomId) throws Exception {
        System.out.println(roomId+"가 시작하자고 한다");
        gameManagerMap.put(roomId, new MafiaceManager(roomId, sessionService));
    }

    //게임 종료
    @MessageMapping("/end/{roomId}")
    @SendTo("/topic/{roomId}")
    public void gameEndBroadcasting(@DestinationVariable String roomId) throws Exception {
        gameManagerMap.remove(roomId);
    }


    //타이머 테스트
    @MessageMapping("/timer/{roomId}")
    public void sendToMessage(@DestinationVariable String roomId) {
        simpMessagingTemplate.convertAndSend("/topic/"+roomId, "start");
    }
}
