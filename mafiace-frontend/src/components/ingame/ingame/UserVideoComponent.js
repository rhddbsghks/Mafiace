<<<<<<< HEAD
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
=======
import React from "react";
import { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager, ownerId }) => {
>>>>>>> 76179ed394909af9cd31c25bb4afbb277a200570
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;
  const id = JSON.parse(streamManager.stream.connection.data).id;

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
