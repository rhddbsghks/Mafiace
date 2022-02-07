package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.common.model.NewSessionInfo;
import com.ssafy.mafiace.db.entity.BaseEntity;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionProperties.Builder;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    private GameRepository gameRepository;
    private GameRepositorySupport gameRepositorySupport;

    // OpenVidu object as entrypoint of the SDK
    private OpenVidu openVidu;

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;

    // Secret shared with our OpenVidu server
    private String SECRET;

    // Collection to pair session names and OpenVidu Session objects
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private int roomNum = 1;
    private boolean[] availableRoomNum = new boolean[100];

    public SessionServiceImpl(@Value("${openvidu.secret}") String secret,
        @Value("${openvidu.url}") String openviduUrl, GameRepository gameRepository,
        GameRepositorySupport gameRepositorySupport) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        this.gameRepository = gameRepository;
        this.gameRepositorySupport = gameRepositorySupport;
    }

    @Override
    public NewSessionInfo openSession(String ownerId, SessionOpenReq sessionOpenReq)
        throws Exception {
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

        for(int i=1; i<100; i++){
            if(!availableRoomNum[i]){
                roomNum = i;
                break;
            }
        }

        gameRepository.save(Game.builder()
            .gameId(gameId)
            .roomNum(roomNum)
            .ownerId(ownerId)
            .gameTitle(sessionOpenReq.getGameTitle())
            .discussionTime(sessionOpenReq.getDiscussionTime())
            .maxPlayer(sessionOpenReq.getMaxPlayer())
            .isPublic(sessionOpenReq.isPublic())
//            .isActive(false)
            .password((sessionOpenReq.getPassword()))
            .build());
        availableRoomNum[roomNum] = true;
        // Return the token
        return NewSessionInfo.of(token, gameId);
    }

    @Override
    public String getToken(String sessionName) throws Exception {
        // Session already exists
        System.out.println("Existing session " + sessionName);
        int maxPlayer = gameRepository.findGameById(sessionName).getMaxPlayer();
        if(this.mapSessions.get(sessionName).getConnections().size() >= maxPlayer){
            return null;
        }
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder().type(
            ConnectionType.WEBRTC).build();

        // Generate a new Connection with the recently created connectionProperties
        String token = this.mapSessions.get(sessionName).createConnection(connectionProperties)
            .getToken();

        return token;
    }

    @Override
    public void closeSession(String sessionName) throws Exception {
        Game deleteRoom = gameRepositorySupport.findById(sessionName);
        availableRoomNum[deleteRoom.getRoomNum()] = false;
        mapSessions.remove(sessionName);
        gameRepository.delete(deleteRoom);
    }
}
