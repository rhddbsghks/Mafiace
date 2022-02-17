package com.ssafy.mafiace.api.controller;

import com.ssafy.mafiace.common.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/send/{roomId}")
    public void sendToMessage(@DestinationVariable String roomId, @Payload Message message) {
       simpMessagingTemplate.convertAndSend("/topic/"+roomId, message);
    }
}
