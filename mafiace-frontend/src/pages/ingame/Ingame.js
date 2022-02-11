import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import SockJsClient from "react-stomp";
import Loader from "../../components/common/Loader";
import UserVideoComponent from "../../components/ingame/ingame/UserVideoComponent";
import Day from "../../components/ingame/ingame/Day";
import Night from "../../components/ingame/ingame/Night";

import * as React from "react";
import axios from "axios";
import jwt from "jwt-decode";

const Ingame = ({ setIngame, gameInfo, token, ingame }) => {
  window.onbeforeunload = () => {
    leaveSession();
  };

  let OV = new OpenVidu();

  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoding] = useState(true);
  const [topics, setTopics] = useState();
  const [start, setStart] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [time, setTime] = useState(5); // 타이머
  const [timer, setTimer] = useState(); // 타이머
  const [count, setCount] = useState(1); // 날짜
  const [head, setHead] = useState(gameInfo.gameTitle); // 헤더 상태메세지
  const [myRole, setMyRole] = useState(); // 내 직업
  const [isVoted, setIsVoted] = useState(false); // 투표완료 유무
  const [myVote, setMyVote] = useState("default"); // 내가 투표한 사람의 닉네임
  const $websocket = useRef(null);

  const userId = jwt(localStorage.getItem("jwt")).sub;
  const userNickname = jwt(localStorage.getItem("jwt")).nickname;
  useEffect(() => {
    // 초기 세팅
    const nickName = jwt(localStorage.getItem("jwt")).nickname;
    const id = jwt(localStorage.getItem("jwt")).sub;

    setTopics([`/topic/${gameInfo.id}`, `/topic/${nickName}`]);
    // --- 2) Init a session ---
    let mySession = OV.initSession();
    setSession(mySession);

    // --- 3) Specify the actions when events take place in the session ---

    // On every new Stream received...
    mySession.on("streamCreated", (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      // let subscriber = mySession.subscribe(event.stream, undefined);
      mySession.subscribeAsync(event.stream, undefined).then((subscriber) => {
        setSubscribers((subs) => [subscriber, ...subs]);
      });
    });

    // On every Stream destroyed...
    mySession.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    // --- 4) Connect to the session with a valid user token ---

    // 'token' parameter should be retrieved and returned by your own backend
    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    mySession
      .connect(token, { nickName, id })
      .then(() => {
        // --- 5) Get your own camera stream ---

        // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
        // element: we will manage it on our own) and with the desired properties
        let publisher = OV.initPublisher(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---

        mySession.publish(publisher);

        // Set the main video in the page to display our webcam and store our Publisher
        setMainStreamManager(publisher);
        setPublisher(publisher);
        setLoding(false);
        console.log(subscribers);
      })
      .catch((error) => {
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });

    return () => {
      window.onbeforeunload();
    };
  }, []);

  useEffect(() => {
    clearInterval(timer);
    if (start) {
      setTimer(
        setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000)
      );
    }
  }, [toggle]);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
      if (gameInfo.ownerId === userId) {
        if (day) {
          // 낮->밤
          setIsVoted(false);
          setTimeout(toNight(), 1000);
        } else if (night) {
          setIsVoted(false);
          setTimeout(toDay(), 1000);
        }
      }
    }
  }, [time]);

  const toDay = () => {
    $websocket.current.sendMessage(`/app/day/${gameInfo.id}`);
  };

  const toNight = () => {
    $websocket.current.sendMessage(`/app/night/${gameInfo.id}`);
  };

  const getVoteResult = () => {
    $websocket.current.sendMessage(`/app/vote/${gameInfo.id}`);
  };

  const kill = () => {
    $websocket.current.sendMessage(`/app/kill/${gameInfo.id}`, myVote);
  };

  const heal = () => {
    $websocket.current.sendMessage(`/app/heal/${gameInfo.id}`, myVote);
  };

  const investigate = () => {
    $websocket.current.sendMessage(`/app/investigate/${gameInfo.id}`, myVote);
  };

  const deleteSubscriber = (streamManager) => {
    setSubscribers((subs) => {
      let index = subs.indexOf(streamManager, 0);
      if (index > -1) {
        subs.splice(index, 1);
        return subs;
      }
      return subs;
    });
  };

  const leaveSession = () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    if (publisher && subscribers.length === 0) {
      console.log("방 삭제");
      deleteRoom();
    } else {
      axios.delete("/mafiace/api/session/user", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { sessionName: gameInfo.id },
      });
    }

    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
    setIngame(!ingame);
  };

  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const handleClick = () => {
    console.log(publisher);
    console.log(subscribers);
    console.log(mainStreamManager);
    console.log("당신의 직업 : " + myRole);
    console.log("====================START======================");
    $websocket.current.sendMessage(`/app/role/${gameInfo.id}/${userNickname}`);
  };

  const gameStart = () => {
    console.log("====================START======================");
    $websocket.current.sendMessage(`/app/timer/${gameInfo.id}`);
    $websocket.current.sendMessage(`/app/start/${gameInfo.id}`);
  };

  const deleteRoom = () => {
    console.log(gameInfo);

    axios.delete("/mafiace/api/session", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      params: { sessionName: gameInfo.id },
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SockJsClient
            url="/mafiace/ws"
            topics={topics}
            onConnect={() => {
              console.log("게임방 소켓 연결");
            }}
            onDisconnect={() => {
              console.log("게임방 소켓 종료");
            }}
            onMessage={(msg) => {
              console.log("직업 수신 " + msg.check);
              if (msg === "start") {
                setStart(true);
                setDay(true);
                setToggle(!toggle);
                setHead("낮이 왔습니다. 마피아를 찾아주세요.");
                // 역할 확인
                console.log("게임스타트!!!");
                setTimeout(() => {
                  $websocket.current.sendMessage(
                    `/app/role/${gameInfo.id}/${userNickname}`
                  );
                }, 1000);
              } else if (msg === "day") {
                setNight(false);
                setDay(true);
                setToggle(!toggle);
                setTime(5);
                setCount((prev) => prev + 1);
                setHead("낮이 왔습니다. 마피아를 찾아주세요.");
              } else if (msg === "night") {
                setDay(false);
                setNight(true);
                setToggle(!toggle);
                setTime(5);
                setHead("밤이 왔습니다.");
              } else if (msg.check === "role") {
                setMyRole(msg.role);
              }
            }}
            ref={$websocket}
          />

          {day ? <Day></Day> : null}
          {night ? <Night></Night> : null}

          <div
            id="session"
            style={{
              position: "absolute",
              zIndex: "10",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            {/* 인게임 헤더 */}
            <div
              id="session-header"
              style={{
                display: "flex",
                width: "95%",
                height: "15%",
                margin: "auto",
                justifyContent: "space-between",
              }}
            >
              {/* 로고 */}
              <div
                style={{
                  width: "20%",
                }}
              >
                <h1 style={{ margin: 0, zIndex: "0" }}>Mafiace</h1>
              </div>

              {/* 메세지 영역 */}
              <div
                style={{
                  width: "50%",
                  backgroundColor: "red",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    justifyContent: "space-between",
                    fontSize: "3em",
                    margin: "auto",
                    position: "relative",
                    top: "40%",
                  }}
                >
                  {start ? <span>Day {count}</span> : null} {head}
                </span>
              </div>

              {/* 버튼 타이머 영역 */}
              <div
                style={{
                  width: "20%",
                }}
              >
                {" "}
                <button onClick={handleClick}>버튼</button>
                {gameInfo.ownerId === userId && !start ? (
                  <button onClick={gameStart}>START</button>
                ) : null}
                <input
                  className="btn btn-large btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={leaveSession}
                  value="Leave session"
                />
                {day || night ? <h2>남은 시간 : {time}</h2> : null}
              </div>
            </div>

            {/* 비디오 영역 */}
            <div
              id="video-container"
              className="col-md-6"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                width: "100%",
                height: "80%",
              }}
            >
              {publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  style={{ margin: "0% 1%", width: "22%", height: "40%" }}
                  onClick={() => handleMainVideoStream(publisher)}
                >
                  <UserVideoComponent
                    streamManager={publisher}
                    ownerId={gameInfo.ownerId}
                  />
                </div>
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container col-md-6 col-xs-6"
                  style={{ margin: "0 1%", width: "22%", height: "40%" }}
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <div>
                    <UserVideoComponent
                      streamManager={sub}
                      ownerId={gameInfo.ownerId}
                      myRole={myRole}
                      setMyVote={setMyVote}
                      isVoted={isVoted}
                      setIsVoted={setIsVoted}
                      night={night}
                      kill={kill}
                      heal={heal}
                      investigate={investigate}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ingame;
