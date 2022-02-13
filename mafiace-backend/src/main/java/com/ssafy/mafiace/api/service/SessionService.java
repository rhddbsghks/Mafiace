package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.common.model.NewSessionInfo;
import com.ssafy.mafiace.db.entity.User;
import java.util.List;

public interface SessionService {

    NewSessionInfo openSession(String ownerId, SessionOpenReq sessionOpenReq) throws Exception;

    String getToken(String roomId, String userId) throws Exception;
    void closeSession(String roomId) throws Exception;
    boolean leaveSession(String roomId, String request);
    boolean toggleReady(String roomId, String userId);
    int getParticipantCount(String roomId);
    boolean isFull(String roomId);
    boolean isExist(String roomId);

    List<User> getParticipantList(String roomId);
}
