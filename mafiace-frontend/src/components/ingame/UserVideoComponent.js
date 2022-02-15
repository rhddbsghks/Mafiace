import React, { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
import axios from "axios";

import "./UserVideo.css";

const UserVideoComponent = ({
  streamManager,
  sub,
  ownerId,
  myRole,
  isAlive,
  deathList,
  setMyVote,
  isVoted,
  setIsVoted,
  day,
  night,
  vote,
  heal,
  investigate,
}) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;
  const id = JSON.parse(streamManager.stream.connection.data).id;
  const tearList = [
    "bronze4",
    "bronze3",
    "bronze2",
    "bronze1",
    "silver4",
    "silver3",
    "silver2",
    "silver1",
    "gold4",
    "gold3",
    "gold2",
    "gold1",
    "platinum4",
    "platinum3",
    "platinum2",
    "platinum1",
    "rainbow4",
    "rainbow3",
    "rainbow2",
    "rainbow1",
  ];
  const [checkAlive, setCheckAlive] = useState(true);
  const [tear, setTear] = useState("");

  useEffect(() => {
    axios
      .get("/mafiace/api/user/rating", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { userId: id },
      })
      .then(({ data }) => {
        let idx = Math.floor((data.message - 1000) / 100);
        idx = idx < 0 ? 0 : idx;
        idx = idx > 19 ? 19 : idx;
        setTear(tearList[idx]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    for (var n in deathList) {
      if (deathList[n] === nickNameTag) {
        setCheckAlive(false);
        return;
      }
    }
    setCheckAlive(true);
  }, [deathList]);

  const clickVote = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    vote(nickNameTag);
  };

  const clickHeal = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    heal(nickNameTag);
  };
  const clickInvestigate = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    investigate(nickNameTag);
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          {ownerId === id ? (
            <img
              src={`/img/crown.png`}
              alt=""
              style={{
                width: "35px",
                position: "relative",
                top: "10px",
                left: "20px",
              }}
            />
          ) : (
            <img
              src={`/img/crown.png`}
              alt=""
              style={{
                visibility: "hidden",
                width: "35px",
                position: "relative",
                top: "10px",
                left: "20px",
              }}
            />
          )}
          <OpenViduVideoComponent
            streamManager={streamManager}
            id={id}
            checkAlive={checkAlive}
          />

          {checkAlive ? (
            <div
              style={{
                width: "50%",
                height: "15%",
                display: "flex",
                borderRadius: "2em",
              }}
            >
              <img
                src={`img/tear/${tear}.png`}
                alt=""
                style={{ position: "absolute" }}
                width="15%"
              />
              <span
                style={{
                  margin: "auto",
                  fontSize: "2.2em",
                  letterSpacing: "0.1em",
                }}
              >
                {nickNameTag}
              </span>
            </div>
          ) : (
            <div
              style={{
                width: "50%",
                height: "15%",
                display: "flex",
                borderRadius: "2em",
                backgroundColor: "#a1a0a0",
              }}
            >
              <span
                style={{
                  margin: "auto",
                  fontSize: "2.2em",
                  letterSpacing: "0.1em",
                }}
              >
                <del>{nickNameTag}</del>
              </span>
            </div>
          )}

          <div
            style={{
              background: "none",
              bottom: "0%",
              width: "35%",
              height: "15%",
              left: "5%",
              textAlign: "center",
            }}
          >
            {!checkAlive ? <span>사망</span> : null}

            {isAlive && checkAlive && !isVoted && day ? (
              <button onClick={clickVote} className="select-btn vote">
                투표
              </button>
            ) : null}

            {sub &&
            isAlive &&
            checkAlive &&
            myRole === "Mafia" &&
            !isVoted &&
            night ? (
              <button onClick={clickVote} className="select-btn kill">
                제거
              </button>
            ) : null}

            {isAlive &&
            checkAlive &&
            myRole === "Doctor" &&
            !isVoted &&
            night ? (
              <button onClick={clickHeal} className="select-btn heal">
                치료
              </button>
            ) : null}

            {sub &&
            isAlive &&
            checkAlive &&
            myRole === "Police" &&
            !isVoted &&
            night ? (
              <button onClick={clickInvestigate} className="select-btn invest">
                수사
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
