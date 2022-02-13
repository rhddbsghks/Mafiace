import { Publisher } from "openvidu-browser";
import React, { useEffect, useState } from "react";
import OpenViduVideoComponent from "./OvVideo";
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
  const [checkAlive, setCheckAlive] = useState(true);

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
    alert(nickNameTag + "님을 선택하였습니다.");
    vote(nickNameTag);
  };

  const clickHeal = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    alert(nickNameTag + "님을 선택하였습니다.");
    heal(nickNameTag);
  };
  const clickInvestigate = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    alert(nickNameTag + "님을 선택하였습니다.");
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
                left: "10px",
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
                left: "10px",
              }}
            />
          )}
          <OpenViduVideoComponent streamManager={streamManager} />

          <div
            style={{
              width: "11%",
              height: "5.5%",
              display: "flex",
              borderRadius: "2em",
            }}
          >
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
          <div>
            {!checkAlive ? <span>사망</span> : null}

            {isAlive && checkAlive && !isVoted && day ? (
              <button onClick={clickVote}>Vote</button>
            ) : null}

            {sub &&
            isAlive &&
            checkAlive &&
            myRole === "Mafia" &&
            !isVoted &&
            night ? (
              <button onClick={clickVote}>KILL</button>
            ) : null}

            {isAlive &&
            checkAlive &&
            myRole === "Doctor" &&
            !isVoted &&
            night ? (
              <button onClick={clickHeal}>SAVE</button>
            ) : null}

            {sub &&
            isAlive &&
            checkAlive &&
            myRole === "Police" &&
            !isVoted &&
            night ? (
              <button onClick={clickInvestigate}>DETECT</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
