import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./room.module.css";
import { Icon } from "semantic-ui-react";

const RoomComp = ({ game, setIngame, ingame, setGameInfo, setToken }) => {
  const randomImg = useState(["angry", "happy", "sad", "netural", "panic"])[0];
  const [randomNum, setRandomNum] = useState();

  useEffect(() => {
    setRandomNum((cur) => Math.floor(Math.random() * 10 + 1) % 5);
  }, []);

  const handleClickRoom = () => {
    enterRoom();
  };

  const enterRoom = () => {
    axios
      .get("/mafiace/api/session/token", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { sessionName: game.id },
      })
      .then(({ data }) => {
        setToken(data.newSessionInfo.token);
        setIngame(!ingame);
        setGameInfo(game);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          alert("존재하지 않는 방입니다.");
        } else if (response.status === 403) {
          localStorage.removeItem("jwt");
          alert("요청 권한이 없습니다");
        }

        window.location.reload();
      });
  };

  return (
    <div className={styles.game} onClick={handleClickRoom}>
      <img
        src={`/img/${randomImg[randomNum]}.png`}
        alt=""
        style={{ height: "60%", margin: "auto" }}
      />

      <div
        style={{
          width: "60%",
          height: "100%",
          marginRight: "5.5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div className={styles["game-header"]}>
          <div style={{ margin: "5.5%" }}>
            <span style={{ fontSize: "0.8em" }}>
              {game.roomNum}&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            <span style={{ fontSize: "34px" }}>{game.gameTitle}</span>
          </div>
        </div>
        <div className={styles["game-info"]}>
          {game.public ? <Icon name="user" /> : <Icon name="lock" />}

          <div style={{ fontSize: "2em" }}>
            {game.maxPlayer % 2 === 0 ? (
              <span style={{ color: "#7f7c824d" }}>PLAYING</span>
            ) : (
              <span style={{ color: "#8157a8" }}>WAITING</span>
            )}
          </div>
          <div>0/{game.maxPlayer}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomComp;
