import React, { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({
  streamManager,
  myRole,
  setMyVote,
  isVoted,
  setIsVoted,
  night,
  kill,
}) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;

  const clickKill = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    console.log(streamManager.stream.connection.data);
    kill();
  };

  const clickHeal = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    console.log(streamManager.stream.connection.data);
  };

  const clickInvestigate = () => {
    setIsVoted(true);
    setMyVote(nickNameTag);
    console.log(streamManager.stream.connection.data);
  };
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
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
            {myRole === "mafia" && !isVoted && night ? (
              <button onClick={clickKill}>KILL</button>
            ) : null}
            {myRole === "doctor" && !isVoted && night ? (
              <button onClick={clickHeal}>HEAL</button>
            ) : null}
            {myRole === "police" && !isVoted && night ? (
              <button onClick={clickInvestigate}>조사</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
