package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.api.response.GameRoomRes;
import com.ssafy.mafiace.api.service.GameService;
import com.ssafy.mafiace.db.entity.Game;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import org.springframework.http.ResponseEntity;
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

        List<Game> list = gameService.getGameList(maxPlayer, isPublic);

        return ResponseEntity.status(200)
            .body(GameRoomRes.of(200, "Success",  list));
    }
}
