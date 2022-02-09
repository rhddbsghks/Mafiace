import React, { useEffect, useRef, useState } from "react";
import SockJsClient from "react-stomp";
import jwt from "jwt-decode";

const HeaderIngameCompo = (gameInfo) => {
  const userId = jwt(localStorage.getItem("jwt")).sub;
  const nickName = jwt(localStorage.getItem("jwt")).nickname;
  const $websocket = useRef(null);
  const [topics, setTopics] = useState([
    `/topic/${gameInfo.id}`,
    `/topic/${nickName}`,
  ]);
  const [time, setTime] = useState(0);
  const [owner, setOwner] = useState(false);

  if (userId == gameInfo.ownerId) {
    setOwner(true);
  }
  const startTimer = () => {};
  return (
    <>
      <h1>HeaderIngame__Compo</h1>
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
        ref={$websocket}
      />
    </>
  );
};

export default HeaderIngameCompo;
