package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.common.model.NewSessionInfo;

public interface SessionService {

    NewSessionInfo openSession(String ownerId, SessionOpenReq sessionOpenReq) throws Exception;

    String getToken(String sessionName, String userId) throws Exception;


    void closeSession(String sessionName) throws Exception;

    void leaveSession(String sessionName, String request);
}
