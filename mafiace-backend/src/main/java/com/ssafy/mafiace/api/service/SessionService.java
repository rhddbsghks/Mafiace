package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;

public interface SessionService {

    String openSession(String ownderId, SessionOpenReq sessionOpenReq) throws Exception;

    String getToken(String sessionName) throws Exception;

}
