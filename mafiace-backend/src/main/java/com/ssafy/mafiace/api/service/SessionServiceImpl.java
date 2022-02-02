package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.db.entity.BaseEntity;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.UserRepository;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionProperties.Builder;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    private GameRepository gameRepository;

    // OpenVidu object as entrypoint of the SDK
    private OpenVidu openVidu;

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;

    // Secret shared with our OpenVidu server
    private String SECRET;

    // Collection to pair session names and OpenVidu Session objects
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();

    public SessionServiceImpl(@Value("${openvidu.secret}") String secret,
        @Value("${openvidu.url}") String openviduUrl, GameRepository gameRepository) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        this.gameRepository = gameRepository;
    }

    @Override
    public String openSession(String ownerId, SessionOpenReq sessionOpenReq) throws Exception {
        String gameId = BaseEntity.shortUUID();

        // New session
        System.out.println("New session " + gameId);

        // Create a new OpenVidu Session
        Session session = this.openVidu.createSession();

        // Generate a new Connection with the recently created connectionProperties
        ConnectionProperties connectionProperties = new Builder().type(
            ConnectionType.WEBRTC).build();

        String token = session.createConnection(connectionProperties).getToken();

        // Store the session and the token in our collections
        this.mapSessions.put(gameId, session);
        System.out.println(gameId);
        gameRepository.save(Game.builder()
            .gameId(gameId)
            .ownerId(ownerId)
            .gameTitle(sessionOpenReq.getGameTitle())
            .discussionTime(sessionOpenReq.getDiscussionTime())
            .maxPlayer(sessionOpenReq.getMaxPlayer())
            .isPublic(sessionOpenReq.isPublic())
            .password((sessionOpenReq.getPassword()))
            .build());

        for (String id : mapSessions.keySet()) {
            System.out.println(id);
        }

        // Return the token
        return token;
    }

    @Override
    public String getToken(String sessionName) throws Exception {
        // Session already exists
        System.out.println("Existing session " + sessionName);

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).build();

        // Generate a new Connection with the recently created connectionProperties
        String token = this.mapSessions.get(sessionName).createConnection(connectionProperties)
            .getToken();

        return token;
    }
}
