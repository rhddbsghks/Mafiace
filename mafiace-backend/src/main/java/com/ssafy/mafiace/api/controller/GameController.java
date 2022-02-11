package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.response.BaseResponseBody;
import com.ssafy.mafiace.api.response.GameRoomRes;
import com.ssafy.mafiace.api.response.VoteRes;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.api.service.SessionService;
import com.ssafy.mafiace.common.model.GameInfo;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.common.model.MafiaceManager;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import javax.annotation.PostConstruct;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
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

    @Autowired
    private GameService gameService;

    @Autowired
    private SessionService sessionService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private Map<String, MafiaceManager> gameManagerMap;

    @PostConstruct
    public void init() { gameManagerMap = new ConcurrentHashMap<>();}

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

        if (gameService.checkPassword(sessionName, password)) {
            return ResponseEntity.status(200)
                .body(BaseResponseBody.of(200, "입장하라"));
        }

        return ResponseEntity.status(401)
            .body(BaseResponseBody.of(401, "비밀번호 불일치"));
    }

    // 게임 시작
    @MessageMapping("/start/{roomId}") // 발행경로
    @SendTo("/topic/{roomId}") // 구독경로
    public void gameStartBroadcasting(@DestinationVariable String roomId) throws Exception {
        System.err.println(roomId+"  is clicked the start btn");
        gameManagerMap.put(roomId, new MafiaceManager(roomId, sessionService, gameService));
    }

    //게임 종료
    @MessageMapping("/end/{roomId}")
    @SendTo("/topic/{roomId}")
    public void gameEndBroadcasting(@DestinationVariable String roomId) throws Exception {
        gameManagerMap.remove(roomId);
    }


    //타이머
    @MessageMapping("/timer/{roomId}")
    public void sendToMessage(@DestinationVariable String roomId) {
        simpMessagingTemplate.convertAndSend("/topic/" + roomId, "start");
    }

    // 낮->밤
    @MessageMapping("/night/{roomId}")
    public void toNight(@DestinationVariable String roomId) {
        simpMessagingTemplate.convertAndSend("/topic/" + roomId, "night");
    }

    // 밤->낮
    @MessageMapping("/day/{roomId}")
    public void toDay(@DestinationVariable String roomId) {
        simpMessagingTemplate.convertAndSend("/topic/" + roomId, "day");
    }

    @MessageMapping("/kill/{roomId}")
    public void killByMafia(@DestinationVariable String roomId, String voted) {
        MafiaceManager manager = gameManagerMap.get(roomId);
        manager.addVoteList(voted);
        System.out.println("죽는닷죽는닷죽는닷죽는닷" + voted);
    }

    @MessageMapping("/heal/{roomId}")
    public void healByDoctor(@DestinationVariable String roomId, String voted) {
        MafiaceManager manager = gameManagerMap.get(roomId);
        manager.setHealTarget(voted);
        System.out.println("힐힐힐힐힐힐힐힐힐힐힐" + voted);
    }

    // 투표 결과를 얻어옴
    @MessageMapping("/vote/{roomId}")
    public void voteResult(@DestinationVariable String roomId) {
        MafiaceManager manager = gameManagerMap.get(roomId);
        VoteRes voteRes=manager.getVoteResult();
        manager.reset();
        simpMessagingTemplate.convertAndSend("/topic/"+roomId, voteRes);
    }

    //역할 확인
    @MessageMapping("/role/{roomId}/{userNickname}")
    public void roleConfirm(@DestinationVariable String roomId, @DestinationVariable String userNickname)
        throws JSONException {
        System.err.println("role socket recieved!");
        String role = gameManagerMap.get(roomId).getPlayers().findRoleName(userNickname);
        System.err.println("nickname's role : " + role);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("role",role);
        simpMessagingTemplate.convertAndSend("/role/"+ roomId + "/" + userNickname, jsonObject.toString());
    }
}
