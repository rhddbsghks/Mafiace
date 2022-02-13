import React from "react";
import { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager, ownerId }) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;
  const id = JSON.parse(streamManager.stream.connection.data).id;

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
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
