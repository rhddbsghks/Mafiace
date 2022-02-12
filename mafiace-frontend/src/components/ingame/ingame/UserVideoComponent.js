import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({
  streamManager,
  ownerId,
  myRole,
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

  const isAlive = () => {
    for (var name in deathList) {
      if (name === nickNameTag) {
        return false;
      }
    }
    return true;
  };

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
            {!isAlive ? <span>사망</span> : null}
            {isAlive && !isVoted && day ? (
              <button onClick={clickVote}>Vote</button>
            ) : null}
            {isAlive && myRole === "Mafia" && !isVoted && night ? (
              <button onClick={clickVote}>KILL</button>
            ) : null}
            {isAlive && myRole === "Doctor" && !isVoted && night ? (
              <button onClick={clickHeal}>SAVE</button>
            ) : null}
            {isAlive && myRole === "Police" && !isVoted && night ? (
              <button onClick={clickInvestigate}>DETECT</button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
