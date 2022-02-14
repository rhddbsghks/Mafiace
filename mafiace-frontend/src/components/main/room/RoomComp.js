import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./room.module.css";
import { Icon, Modal, Form } from "semantic-ui-react";
import CheckCam from "./CheckCam";

const RoomComp = ({
  game,
  participantCount,
  setIngame,
  ingame,
  setGameInfo,
  setToken,
}) => {
  const randomImg = useState([
    "angry",
    "happy",
    "sad",
    "neutral",
    "surprised",
  ])[0];
  const [randomNum, setRandomNum] = useState();
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [checkCam, setCheckCam] = useState(false);

  useEffect(() => {
    setRandomNum((cur) => Math.floor(Math.random() * 5));
  }, []);

  const handleClickRoom = () => {
    if (participantCount === game.maxPlayer) {
      alert("자리가 없어요ㅠㅠ");
      window.location.reload();
      return;
    }
    enterRoom();
  };

  const enterRoom = () => {
    if (game.active) {
      alert("이미 진행중인 방입니다.");
      return;
    }

    if (!game.public) {
      if (!openPasswordModal) {
        setOpenPasswordModal(true);
        return;
      } else {
        axios
          .get("/mafiace/api/game/checkpw", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
            params: { sessionName: game.id, password },
          })
          .catch(() => {
            alert("비밀번호가 일치하지 않아요!");
            return;
          });
      }
    }

    axios
      .get("/mafiace/api/session/token", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { sessionName: game.id },
      })
      .then(({ data }) => {
        setToken(data.newSessionInfo.token);
        setGameInfo(game);
        setCheckCam(true);
      })
      .catch(({ response }) => {
        if (response.status === 404) {
          alert("존재하지 않는 방입니다.");
        } else if (response.status === 403) {
          localStorage.removeItem("jwt");
          alert("요청 권한이 없습니다");
        } else if (response.status === 409) {
          alert("자리가 없어요 ㅠㅠ");
        } else if (response.status === 500) {
          alert("존재하지 않는 방입니다.");
        } else if (response.status === 412) alert("이미 진행중인 방입니다.");

        window.location.reload();
      });
  };

  return (
    <>
      <CheckCam
        checkCam={checkCam}
        setCheckCam={setCheckCam}
        setIngame={setIngame}
        ingame={ingame}
        gameId={game.id}
      ></CheckCam>
      <Modal
        dimmer="inverted"
        size="tiny"
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onOpen={() => setOpenPasswordModal(true)}
        className="make-body"
      >
        <div className="room-make-box" style={{ height: "100%" }}>
          <Form unstackable style={{ height: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div className="room-make-box-title">비밀번호 입력</div>
              <div>
                <Form.Field>
                  <input
                    onChange={({ target }) => {
                      setPassword(target.value);
                    }}
                    placeholder="비밀번호"
                    type="password"
                    required
                  />
                </Form.Field>
              </div>

              <div
                style={{
                  display: "flex",
                  height: "50px",
                  justifyContent: "center",
                  marginTop: "10%",
                }}
              >
                <button
                  className="create-room-btn make"
                  onClick={() => {
                    enterRoom();
                  }}
                >
                  확인
                </button>
                <button
                  className="create-room-btn cancel"
                  onClick={() => setOpenPasswordModal(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
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
              <span style={{ fontSize: "0.7em" }}>
                {game.roomNum}&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span style={{ fontSize: "34px" }}>{game.gameTitle}</span>
            </div>
          </div>
          <div className={styles["game-info"]}>
            {game.public ? <Icon name="user" /> : <Icon name="lock" />}

            <div style={{ fontSize: "2em" }}>
              {game.active ? (
                <span style={{ color: "#7f7c824d" }}>PLAYING</span>
              ) : (
                <span style={{ color: "#8157a8" }}>WAITING</span>
              )}
            </div>
            <div>
              {participantCount}/{game.maxPlayer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomComp;
