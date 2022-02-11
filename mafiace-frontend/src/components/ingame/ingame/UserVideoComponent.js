import React, { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({
  streamManager,
  ownerId,
  myRole,
  setMyVote,
  isVoted,
  setIsVoted,
  night,
  kill,
  heal,
  investigate,
}) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;
  const id = JSON.parse(streamManager.stream.connection.data).id;

  const clickKill = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    kill();
  };

  const clickHeal = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
  };
  const clickInvestigate = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
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
                left: "-5px",
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
                left: "-5px",
              }}
            />
          )}
          <OpenViduVideoComponent streamManager={streamManager} />
          <div style={{ width: "11%", height: "5.5%", display: "flex" }}>
            <span
              style={{
                margin: "auto",
                fontSize: "2em",
                letterSpacing: "0.2em",
              }}
            >
              {nickNameTag}
            </span>
          </div>
          <div>
            {myRole === "Mafia" && !isVoted && night ? (
              <button onClick={clickKill}>KILL</button>
            ) : null}
            {myRole === "Doctor" && !isVoted && night ? (
              <button onClick={clickHeal}>HEAL</button>
            ) : null}
            {myRole === "Police" && !isVoted && night ? (
              <button onClick={clickInvestigate}>조사</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
