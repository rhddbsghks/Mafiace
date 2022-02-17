import React, { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
import axios from "axios";

import "./UserVideo.css";

const UserVideoComponent = ({
  streamManager,
  sub,
  ownerId,
  myRole,
  count,
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
  myVote,
  mafiaTeam,
}) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;
  const id = JSON.parse(streamManager.stream.connection.data).id;
  const tearList = [
    "Bronze4",
    "Bronze3",
    "Bronze2",
    "Bronze1",
    "Silver4",
    "Silver3",
    "Silver2",
    "Silver1",
    "Gold4",
    "Gold3",
    "Gold2",
    "Gold1",
    "Platinum4",
    "Platinum3",
    "Platinum2",
    "Platinum1",
    "Rainbow4",
    "Rainbow3",
    "Rainbow2",
    "Rainbow1",
  ];
  const [checkAlive, setCheckAlive] = useState(true);
  const [tear, setTear] = useState("");
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    if (!mafiaTeam) return;

    if (!night) {
      setIsBlur(false);
      return;
    }
    let isCitizen = true;

    mafiaTeam.forEach((mafiaNick) => {
      if (mafiaNick === nickNameTag) {
        isCitizen = false;
      }
    });

    setIsBlur(isCitizen);
  }, [night]);

  useEffect(() => {
    console.log(streamManager);
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
  }, [streamManager]);

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
                width: "10%",
                position: "relative",
                top: "10px",
                left: "10%",
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
            isBlur={isBlur}
          />

          {checkAlive ? (
            <div
              style={{
                width: "70%",
                height: "15%",
                display: "flex",
                borderRadius: "2em",
              }}
            >
              <img
                src={`img/tear/${tear}.png`}
                alt=""
                style={{ position: "absolute", left: "7%" }}
                width="10%"
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
              width: "100%",
              height: "15%",
              textAlign: "center",
            }}
          >
            {!checkAlive ? <div className="selected dead">사망</div> : null}

            {count > 1 && isAlive && checkAlive && !isVoted && day ? (
              <button onClick={clickVote} className="select-btn vote">
                투표
              </button>
            ) : null}

            {isVoted && myVote === nickNameTag && day ? (
              <div className="selected vote">투표 완료</div>
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

            {myRole === "Mafia" &&
            isVoted &&
            myVote === nickNameTag &&
            night ? (
              <div className="selected kill">제거 시도</div>
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

            {myRole === "Doctor" &&
            isVoted &&
            myVote === nickNameTag &&
            night ? (
              <div className="selected heal">치료 완료</div>
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

            {myRole === "Police" &&
            isVoted &&
            myVote === nickNameTag &&
            night ? (
              <div className="selected invest">수사 완료</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
