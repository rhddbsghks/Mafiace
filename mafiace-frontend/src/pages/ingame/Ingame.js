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
import "./ingame-chat.css";

import * as React from "react";
import axios from "axios";
import jwt from "jwt-decode";

const Ingame = ({ setIngame, gameInfo, setGameInfo, token, ingame }) => {
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
  const [chat, setChat] = useState(false);

  // 웹 소켓
  const $websocket = useRef(null);
  const [topics, setTopics] = useState();
  const chatBox = useRef();
  const chatMessage = useRef();
  const [messages, setMessages] = useState([]);

  // 인게임
  const [time, setTime] = useState(gameInfo.discussionTime); // 타이머
  const [timer, setTimer] = useState(); // 타이머
  const [count, setCount] = useState(1); // 날짜
  const [stateMessage, setStateMessage] = useState(gameInfo.gameTitle); // 헤더 상태메세지
  const [myRole, setMyRole] = useState(""); // 내 직업
  const [isVoted, setIsVoted] = useState(false); // 투표완료 유무
  const [myVote, setMyVote] = useState("default"); // 내가 투표한 사람의 닉네임
  const [deathList, setDeathList] = useState([]); // 죽은 사람들 닉네임
  const [isAlive, setIsAlive] = useState("alive"); // 나의 상태
  const [mafiaTeam, setMafiaTeam] = useState(); //마피아 닉네임 목록

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
          setTimeout(() => {
            checkGameEnd("toNight");
          }, 1000);
        } else if (night) {
          getVoteResult();
          setTimeout(() => {
            checkGameEnd("toDay");
          }, 1000);
        }
      }
    }
  }, [time]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  };

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
    if (start) {
      $websocket.current.sendMessage(`/app/exit/${gameInfo.id}/${nickname}`);
    }
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
    if (subscribers.length < 3) {
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
    setStateMessage("자유롭게 대화를 나눠주세요.");
  };

  const checkGameEnd = (next) => {
    $websocket.current.sendMessage(`/app/end/${gameInfo.id}`, next);
  };

  const endGame = () => {
    setStart(false);
    setStartButton(true);
    setDay(false);
    setNight(false);
    setIsVoted(false);
    setIsAlive(true);
    setMyRole();
    setMafiaTeam();
    setDeathList([]);
    setStateMessage(gameInfo.gameTitle);
    setTime(gameInfo.discussionTime);
    setCount(1);
    setMessages([]);
    publisher.publishAudio(true);
    for (var idx in subscribers) {
      subscribers[idx].subscribeToAudio(true);
      subscribers[idx].subscribeToVideo(true);
    }
  };

  const deleteRoom = () => {
    axios.delete("/mafiace/api/session", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      params: { sessionName: gameInfo.id },
    });
  };

  const onEnter = (e) => {
    if (e.key == "Enter") {
      sendMsg();
    }
  };

  const ghostChat = () => {
    setChat(!chat);
  };

  const sendMsg = () => {
    $websocket.current.sendMessage(
      `/app/send/${gameInfo.id}`,
      JSON.stringify({
        nickname: nickname,
        message: chatMessage.current.value,
        check: "chat",
      })
    );
    chatMessage.current.value = "";
  };

  return (
    <div>
      <JobCard
        openJobCard={openJobCard}
        setopenJobCard={setopenJobCard}
        myRole={myRole}
        mafiaTeam={mafiaTeam}
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
                  setTime(gameInfo.discussionTime);
                  setCount((prev) => prev + 1);
                  setStateMessage("마피아를 찾아주세요!");
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
                    setStateMessage("걱정 가득한 채로 잠이 들었습니다.");
                  }
                }, 3000);
              } else if (msg.check === "role") {
                setMyRole(msg.role);
                if (msg.role === "Mafia") {
                  $websocket.current.sendMessage(
                    `/app/mafia/${gameInfo.id}/${nickname}`
                  );
                }
              } else if (msg.end === "MafiaTeam") {
                setMafiaTeam(msg.mafia);
              } else if (msg.check === "investigate") {
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
                  setStateMessage(msg.nickname + "님이 살해당했습니다.");
                  setDeathList((prev) => [...prev, msg.nickname]);
                  if (msg.nickname === nickname) {
                    setIsAlive(false); // 사망
                    publisher.publishAudio(false);
                  }
                }
              } else if (msg.check === "save") {
                setStateMessage("의사가 시민을 살렸습니다.");
              } else if (msg.check === "nobody") {
                setStateMessage("아무 일도 일어나지 않았습니다.");
              } else if (msg.end === "end") {
                if (msg.winTeam === "Mafia") {
                  alert("마피아팀 승리!!! 마피아는 " + msg.mafia + "였습니다!");
                } else {
                  alert("시민팀 승리!!! 마피아는 " + msg.mafia + "였습니다!");
                }
                endGame();
              } else if (msg.end === "toDay") {
                if (gameInfo.ownerId === userId) {
                  toDay();
                }
              } else if (msg.end === "toNight") {
                if (gameInfo.ownerId === userId) {
                  toNight();
                }
              } else if (msg.check === "exit" && start) {
                setDeathList((prev) => [...prev, msg.nickname]);
              } else if (msg.check === "owner") {
                // 소켓을 받은 사람이 방장이 되게 하기
                setGameInfo((prev) => {
                  return { ...prev, ownerId: msg.ownerNickname };
                });
              } else if (msg.check === "chat") {
                setMessages((prev) => [...prev, msg]);
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
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "1%",
                  left: "2%",
                }}
              >
                <img src="img/Logo.png" alt="" width="60%" />
                <div>
                  <span style={{ fontSize: "2.5em" }} className="gray">
                    Ma
                  </span>
                  <span style={{ fontSize: "2.5em" }} className="color">
                    f
                  </span>
                  <span style={{ fontSize: "2.5em" }} className="gray">
                    i
                  </span>
                  <span style={{ fontSize: "2.5em" }} className="color">
                    ace
                  </span>
                </div>
              </div>

              {/* 메세지 영역 */}
              <div
                style={{
                  width: "55%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "5em",
                  borderRadius: "1rem",
                }}
              >
                {!start ? null : (
                  <div style={{ margin: "auto", fontSize: "0.7em" }}>
                    Day {count} {day ? "낮" : "밤"}
                  </div>
                )}

                {!start ? (
                  <div
                    style={{
                      margin: "auto",
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    {stateMessage}
                  </div>
                ) : (
                  <div
                    style={{
                      margin: "auto",
                      width: "80%",
                      textAlign: "center",
                    }}
                  >
                    {stateMessage}
                  </div>
                )}
              </div>

              {/* 버튼 타이머 영역 */}
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
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
                    </div>
                    <div
                      style={{
                        display: "flex",
                        margin: "auto",
                        fontSize: "10em",
                      }}
                    >
                      <div className="ingame-timer">{time}</div>
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
                    myVote={myVote}
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
                      count={count}
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
                      myVote={myVote}
                    />
                  </div>
                </div>
              ))}
              {!isAlive ? (
                <div className="chat-container">
                  <button className="chat-button" onClick={ghostChat}>
                    ㅁ
                  </button>

                  {chat ? (
                    <div className="chat-box open">
                      <div className="chat-head">사망자 채팅방</div>
                      <div
                        className="scrollbar chat-scroll chat-size"
                        ref={chatBox}
                      >
                        {messages.map((msg, index) => {
                          return (
                            <div key={index}>
                              {nickname === msg.nickname ? (
                                <div className="chat" key={msg.nickname}>
                                  <span className="chat-my">
                                    {msg.nickname} :{" "}
                                  </span>
                                  <span className="chat-message">
                                    {msg.message}
                                  </span>
                                </div>
                              ) : (
                                <div className="chat" key={msg.nickname}>
                                  <span className="chat-other">
                                    {msg.nickname} :{" "}
                                  </span>
                                  <span className="chat-message">
                                    {msg.message}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <input
                          type="text"
                          size="42"
                          placeholder="메세지를 입력해주세요."
                          onKeyPress={onEnter}
                          ref={chatMessage}
                        />
                        <button className="send-btn" onClick={sendMsg}>
                          Send
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ingame;
