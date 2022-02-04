package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.common.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/user-all")
    @SendTo("/topic/user")
    public Message sendToAll(@Payload Message message) {
        return message;
    }
}
