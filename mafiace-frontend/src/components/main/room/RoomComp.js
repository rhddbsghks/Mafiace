import React, { useEffect, useState } from "react";
import styles from "./room.module.css";
import { Icon } from "semantic-ui-react";

const RoomComp = ({ game }) => {
  const [randomImg, setRandomImg] = useState([
    "angry",
    "happy",
    "sad",
    "netural",
    "panic",
  ]);
  const [randomNum, setRandomNum] = useState();

  useEffect(() => {
    setRandomNum((cir) => Math.floor(Math.random() * 10 + 1) % 5);
  }, []);

  console.log(game);

  return (
    <div className={styles.game}>
      <img
        src={`./img/${randomImg[randomNum]}.png`}
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
            {game.roomNum} &nbsp;&nbsp;&nbsp;
            {game.gameTitle}
          </div>
        </div>
        <div className={styles["game-info"]}>
          {game.public ? <Icon name="lock" /> : <Icon name="user" />}

          <div style={{ fontSize: "2em" }}>WAITING</div>
          <div>0/{game.maxPlayer}</div>
        </div>
      </div>
    </div>
  );
};

export default RoomComp;
