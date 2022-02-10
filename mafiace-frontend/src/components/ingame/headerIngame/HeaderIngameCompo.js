import React, { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import jwt from "jwt-decode";

const HeaderIngameCompo = ({ gameInfo }) => {
  const userId = jwt(localStorage.getItem("jwt")).sub;
  const nickName = jwt(localStorage.getItem("jwt")).nickname;
  const $websocket = useRef(null);
  const [topics, setTopics] = useState([
    `/topic/${gameInfo.id}`,
    `/topic/${nickName}`,
  ]);
  const [time, setTime] = useState(10);
  const [owner, setOwner] = useState(false);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (userId === gameInfo.ownerId) {
      setOwner(true);
    }
  }, []);

  useEffect(() => {
    if (time <= 0) {
      console.log("취소!");
      clearInterval(timer);
    }
  }, [time]);

  const startTimer = () => {
    $websocket.current.sendMessage(`/app/timer/${gameInfo.id}`);
  };

  return (
    <>
      <h1 style={{ margin: 0, position: "absolute", zIndex: "0" }}>
        HeaderIngame__Compo
      </h1>
      {owner ? <button onClick={startTimer}>Timer</button> : null}
      <h2>{time}</h2>
      <SockJsClient
        url="http://localhost:8080/mafiace/ws/"
        topics={topics}
        onConnect={() => {
          console.log("Connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          setTimer(
            setInterval(() => {
              setTime((prev) => prev - 1);
            }, 1000)
          );
        }}
        ref={$websocket}
      />
    </>
  );
};

export default HeaderIngameCompo;
