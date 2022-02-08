import React from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager }) => {
  const nickNameTag = streamManager.stream.connection.data;

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <p>{nickNameTag}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
