import { useEffect, useState, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import SockJsClient from "react-stomp";
import Loader from "../../components/common/Loader";
import UserVideoComponent from "../../components/ingame/UserVideoComponent";
import Day from "../../components/ingame/Day";
import Night from "../../components/ingame/Night";
import Count321 from "../../components/ingame/Count321";
import JobCard from "../../components/ingame/JobCard";
import "./ingame-btn.css";

import * as React from "react";
import axios from "axios";
import jwt from "jwt-decode";

const Ingame = ({ setIngame, gameInfo, token, ingame }) => {
  window.onbeforeunload = () => {
    leaveSession();
  };

  // 세션 관련
  let OV = new OpenVidu();
  const [session, setSession] = useState();
  const [mainStreamManager, setMainStreamManager] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);

  // 페이지 상태
  const [day, setDay] = useState(false);
  const [night, setNight] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoding] = useState(true);
  const [startButton, setStartButton] = useState(false);
  const [start, setStart] = useState(false);
  const [count321, setCount321] = useState(false);
  const [openJobCard, setopenJobCard] = useState(false);

  // 웹 소켓
  const $websocket = useRef(null);
  const [topics, setTopics] = useState();

  // 인게임
  const [time, setTime] = useState(10); // 타이머
  const [timer, setTimer] = useState(); // 타이머
  const [count, setCount] = useState(1); // 날짜
  const [stateMessage, setStateMessage] = useState(gameInfo.gameTitle); // 헤더 상태메세지
  const [myRole, setMyRole] = useState(""); // 내 직업
  const [isVoted, setIsVoted] = useState(false); // 투표완료 유무
  const [myVote, setMyVote] = useState("default"); // 내가 투표한 사람의 닉네임
  const [deathList, setDeathList] = useState([]); // 죽은 사람들 닉네임
  const [isAlive, setIsAlive] = useState("alive"); // 나의 상태

  // 내 정보
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    // 초기 세팅
    const nickname = jwt(localStorage.getItem("jwt")).nickname;
    const id = jwt(localStorage.getItem("jwt")).sub;

    setNickname(nickname);
    setUserId(id);

    setTopics([`/topic/${gameInfo.id}`, `/topic/${nickname}`]);
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
      .connect(token, { nickName: nickname, id })
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
          getVoteResult();
          toNight();
        } else if (night) {
          getVoteResult();
          setTimeout(() => {
            checkGameEnd();
          }, 1000);
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
    $websocket.current.sendMessage(`/app/result/${gameInfo.id}`);
  };

  const vote = (voted) => {
    $websocket.current.sendMessage(`/app/vote/${gameInfo.id}`, voted);
  };

  const heal = (voted) => {
    $websocket.current.sendMessage(`/app/heal/${gameInfo.id}`, voted);
  };

  const investigate = (voted) => {
    $websocket.current.sendMessage(
      `/app/investigate/${gameInfo.id}/${nickname}`,
      voted
    );
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
    $websocket.current.sendMessage(`/app/exit/${gameInfo.id}/${nickname}`);
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

  const clickJob = () => {
    setopenJobCard(true);
  };

  const clickStart = () => {
    console.log("====================START======================");
    if (subscribers.length < 4) {
      alert("게임을 시작하기 위해 최소 4명의 유저가 필요합니다.");
    } else {
      setStartButton(false);
      $websocket.current.sendMessage(`/app/timer/${gameInfo.id}`);
      $websocket.current.sendMessage(`/app/start/${gameInfo.id}`);
    }
  };

  const startGame = () => {
    setCount321(false);
    setopenJobCard(true);
    console.log("====================시작!============================");
    setStart(true);
    setDay(true);
    setToggle(!toggle);
    setStateMessage("마피아를 찾아주세요!");
  };

  const checkGameEnd = () => {
    $websocket.current.sendMessage(`/app/end/${gameInfo.id}`);
  };

  const endGame = () => {
    setStart(false);
    setStartButton(true);
    setDay(false);
    setNight(false);
    setIsVoted(false);
    setIsAlive(true);
    setMyRole();
    setDeathList([]);
    setStateMessage(gameInfo.gameTitle);
    setTime(10);
    setCount(1);
    publisher.publishAudio(true);
    for (var idx in subscribers) {
      subscribers[idx].subscribeToAudio(true);
      subscribers[idx].subscribeToVideo(true);
    }
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
      <JobCard
        openJobCard={openJobCard}
        setopenJobCard={setopenJobCard}
        myRole={myRole}
      />
      {loading ? (
        <Loader msg="입장 중..." />
      ) : (
        <>
          <SockJsClient
            url="/mafiace/ws"
            topics={topics}
            onConnect={() => {
              console.log("게임방 소켓 연결");
              setStartButton(true);
            }}
            onDisconnect={() => {
              console.log("게임방 소켓 종료");
            }}
            onMessage={(msg) => {
              if (msg === "start") {
                setCount321(true);
                setTimeout(startGame, 5000);
                // 역할 확인
                setTimeout(() => {
                  $websocket.current.sendMessage(
                    `/app/role/${gameInfo.id}/${nickname}`
                  );
                }, 4000);
              } else if (msg === "day") {
                setTimeout(() => {
                  for (var idx in subscribers) {
                    subscribers[idx].subscribeToAudio(true);
                    subscribers[idx].subscribeToVideo(true);
                  }
                  setNight(false);
                  setDay(true);
                  setIsVoted(false);
                  setToggle(!toggle);
                  setTime(10);
                  setCount((prev) => prev + 1);
                  setStateMessage("낮이 왔습니다. 마피아를 찾아주세요.");
                }, 3000);
              } else if (msg === "night") {
                setTimeout(() => {
                  if (myRole !== "Mafia") {
                    for (var idx in subscribers) {
                      subscribers[idx].subscribeToAudio(false);
                      subscribers[idx].subscribeToVideo(false);
                    }
                  }
                  setDay(false);
                  setNight(true);
                  setIsVoted(false);
                  setToggle(!toggle);
                  setTime(15);
                  if (myRole === "Mafia") {
                    setStateMessage("처리할 사람을 투표해주세요.");
                  } else if (myRole === "Police") {
                    setStateMessage("용의자 한 명을 조사해보세요.");
                  } else if (myRole === "Doctor") {
                    setStateMessage("위급 환자 한 명을 진료해주세요.");
                  } else {
                    setStateMessage("오늘 밤도 안녕하기를...");
                  }
                }, 3000);
              } else if (msg.check === "role") {
                console.log("==================");
                console.log(msg.role);
                setMyRole(msg.role);
              } else if (msg.check === "investigate") {
                console.log("경찰이 조사한 대상의 직업" + msg.role);
                if (msg.role === "Mafia") {
                  alert(myVote + "님은 마피아입니다.");
                } else {
                  alert(myVote + "님은 시민입니다.");
                }
              }
              //getVoteResult
              else if (msg.check === "selected") {
                if (day) {
                  setStateMessage(msg.nickname + "님이 추방당했습니다.");
                  setDeathList((prev) => [...prev, msg.nickname]);
                  if (msg.nickname === nickname) {
                    setIsAlive(false); // 사망
                    publisher.publishAudio(false);
                  }
                } else {
                  setStateMessage(
                    msg.nickname + "님이 마피아에게 살해당했습니다."
                  );
                  setDeathList((prev) => [...prev, msg.nickname]);
                  if (msg.nickname === nickname) {
                    setIsAlive(false); // 사망
                  }
                }
              } else if (msg.check === "save") {
                setStateMessage("밤에 아무도 죽지 않았습니다.");
              } else if (msg.check === "nobody") {
                setStateMessage("아무 일도 일어나지 않았습니다.");
              } else if (msg.end) {
                if (msg.winTeam === "Mafia") {
                  alert("마피아팀 승리!!! 마피아는 " + msg.mafia + "였습니다!");
                } else {
                  alert("시민팀 승리!!! 마피아는 " + msg.mafia + "였습니다!");
                }
                endGame();
              } else if (!msg.end) {
                toDay();
              } else if (msg.check === "exit") {
                setDeathList((prev) => [...prev, msg.nickname]);
              }
            }}
            ref={$websocket}
          />

          {day ? <Day></Day> : null}
          {night ? <Night></Night> : null}
          {count321 ? <Count321 /> : null}

          <div
            id="session"
            style={{
              position: "absolute",
              zIndex: "9",
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
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "4em",
                  borderRadius: "1rem",
                }}
              >
                {!start ? null : (
                  <div style={{ margin: "auto" }}>
                    Day {count} {day ? "낮" : "밤"}
                  </div>
                )}

                <div
                  style={{ margin: "auto", width: "60%", textAlign: "center" }}
                >
                  {stateMessage}
                </div>
              </div>

              {/* 버튼 타이머 영역 */}
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {!start ? (
                  <>
                    <div style={{ display: "flex" }}>
                      {gameInfo.ownerId === userId && startButton ? (
                        <button
                          className="ingame-btn start"
                          onClick={clickStart}
                        >
                          START
                        </button>
                      ) : null}
                    </div>
                    <div style={{ display: "flex", margin: "auto" }}>
                      {!count321 ? (
                        <button
                          className="ingame-btn leave"
                          onClick={leaveSession}
                        >
                          나가기
                        </button>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div style={{ display: "flex" }}>
                      <button className="ingame-btn job" onClick={clickJob}>
                        내 직업
                      </button>
                      <div>남은 시간 : {time}</div>
                    </div>
                  </>
                )}
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
                    myRole={myRole}
                    isAlive={isAlive}
                    deathList={deathList}
                    setMyVote={setMyVote}
                    isVoted={isVoted}
                    setIsVoted={setIsVoted}
                    night={night}
                    heal={heal}
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
                      sub="sub"
                      ownerId={gameInfo.ownerId}
                      myRole={myRole}
                      isAlive={isAlive}
                      deathList={deathList}
                      setMyVote={setMyVote}
                      isVoted={isVoted}
                      setIsVoted={setIsVoted}
                      day={day}
                      night={night}
                      vote={vote}
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
