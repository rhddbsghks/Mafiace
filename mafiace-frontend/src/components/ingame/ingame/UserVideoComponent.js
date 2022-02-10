import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager }) => {
  const nickNameTag = JSON.parse(streamManager.stream.connection.data).nickName;

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
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
