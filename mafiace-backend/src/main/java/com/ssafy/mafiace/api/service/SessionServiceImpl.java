package com.ssafy.mafiace.api.service;

import com.ssafy.mafiace.api.request.SessionOpenReq;
import com.ssafy.mafiace.common.model.NewSessionInfo;
import com.ssafy.mafiace.db.entity.BaseEntity;
import com.ssafy.mafiace.db.entity.Game;
import com.ssafy.mafiace.db.entity.User;
import com.ssafy.mafiace.db.repository.GameRepository;
import com.ssafy.mafiace.db.repository.GameRepositorySupport;
import com.ssafy.mafiace.db.repository.UserRepository;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionProperties.Builder;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.Session;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private GameRepositorySupport gameRepositorySupport;
    @Autowired
    private UserRepository userRepository;

    // gameId -> userList
    private Map<String, List<User>> userList = new ConcurrentHashMap<>();

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
        GameRepositorySupport gameRepositorySupport, UserRepository userRepository) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
        this.gameRepository = gameRepository;
        this.gameRepositorySupport = gameRepositorySupport;
        this.userRepository = userRepository;
    }

    @Override
    public NewSessionInfo openSession(String ownerNickname, SessionOpenReq sessionOpenReq)
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
        for (int i = 1; i < 100; i++) {
            if (!availableRoomNum[i]) {
                roomNum = i;
                break;
            }
        }
        Game game =
            gameRepository.save(Game.builder()
                .gameId(gameId)
                .roomNum(roomNum)
                .ownerId(ownerNickname)
                .gameTitle(sessionOpenReq.getGameTitle())
                .discussionTime(sessionOpenReq.getDiscussionTime())
                .maxPlayer(sessionOpenReq.getMaxPlayer())
                .isPublic(sessionOpenReq.isPublic())
//            .isActive(false)
                .password((sessionOpenReq.getPassword()))
                .build());
        availableRoomNum[roomNum] = true;

        Optional<User> user = userRepository.findByNickname(ownerNickname);
        userList.put(gameId, new ArrayList<>());
        userList.get(gameId).add(user.get());
        System.err.println("Room available : " + userList.get(gameId).size() + " / "
            + sessionOpenReq.getMaxPlayer());
        // Return the token
        return NewSessionInfo.of(token, gameId);
    }

    @Override
    public String getToken(String sessionName, String nickname) throws Exception {
        // Session already exists
        System.out.println("Existing session " + sessionName);
        Optional<Game> game = gameRepository.findById(sessionName);
        if (game.get() == null) {
            return "Not Found";
        }
        int maxPlayer = game.get().getMaxPlayer();
        System.err.println(game.get().toString());
        if (this.mapSessions.get(sessionName).getConnections().size() >= maxPlayer) {
            return "Session is already full";
        } else {
            Optional<User> user = userRepository.findByNickname(nickname);
            if (user == null) {
                return "Valid User";
            }
            userList.get(game.get().getId()).add(user.get());
            System.err.println("Room available : " + userList.get(sessionName).size() + " / 8");
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

    @Override
    public void leaveSession(String sessionName, String nickname) {
        Game game = gameRepositorySupport.findById(sessionName);
        Optional<User> user = userRepository.findByNickname(nickname);
        System.err.println("before leave : " + userList.get(sessionName).size());
        if (user == null) {
            return;
        }
        for (User leaveUser : userList.get(sessionName)) {
            if (leaveUser.getNickname().equals(user.get().getNickname())) {
                userList.get(sessionName).remove(leaveUser);
                break;
            }
        }
        System.err.println("afeter leave : " + userList.get(sessionName).size());
    }

    @Override
    public boolean toggleReady(String sessionName, String nickname) {
        Game game = gameRepositorySupport.findById(sessionName);
        for (User user : userList.get(sessionName)) {
            if (user.getNickname().equals(nickname)) {
                user.setReady(!user.isReady());
                return true;
            }
        }
        return false;
    }

    @Override
    public int getParticipantCount(String sessionName) {
        return userList.get(sessionName).size();
    }

    @Override
    public boolean isFull(String sessionName) {
        return gameRepositorySupport.findById(sessionName).getMaxPlayer() == userList.get(
            sessionName).size();
    }
}
