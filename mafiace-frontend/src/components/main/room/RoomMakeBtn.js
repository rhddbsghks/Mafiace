import React, { useEffect, useState, useRef } from "react";
import { Dropdown, Form, Modal } from "semantic-ui-react";
import axios from "axios";
import styles from "./room.module.css";
import "./room-make.css";
import jwt from "jwt-decode";

const RoomMakeBtn = ({ setGameInfo, setToken, setIngame, ingame }) => {
  const defaultGameTitle = [
    "너만 오면 고!",
    "열정 6기 핫식스!!",
    "냉혹한 마피아",
    "까딱하다 추방",
    "모두 다 취뽀하자",
    "마피아스 화이팅!",
    "서울 6반 짱",
    "포커페이스",
    "이거하다 밤샘",
    "동작그만 마피아냐?",
  ];
  const maxPlayerOptions = [
    { key: "8", value: 8, text: "8명 이하" },
    { key: "7", value: 7, text: "7명 이하" },
    { key: "6", value: 6, text: "6명 이하" },
    { key: "5", value: 5, text: "5명 이하" },
  ];
  const timeOptions = [
    { key: "30", value: 30, text: "30초" },
    { key: "60", value: 60, text: "60초" },
    { key: "90", value: 90, text: "90초" },
  ];

  const [openRoomMake, setOpenRoomMake] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [discussionTime, setDiscussionTime] = useState(60);
  const [maxPlayer, setMaxPlayer] = useState(8);

  const inputTitle = useRef();
  const inputPassword = useRef();

  const makeRoom = () => {
    if (inputTitle.current.value === "") return;
    if (!isPublic && inputPassword.current.value === "") return;
    let body = {
      gameTitle: inputTitle.current.value,
      ownerId: jwt(localStorage.getItem("jwt")).sub,
      public: isPublic,
      discussionTime,
      maxPlayer,
      password: inputPassword.current.value,
    };

    axios
      .post("/mafiace/api/session/token", body, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        body.id = res.data.newSessionInfo.gameId;
        setGameInfo(body);
        setToken(res.data.newSessionInfo.token);
        setIngame(!ingame);
      })
      .catch(({ response }) => {
        console.log(response);
        if (response.status === 403) {
          localStorage.removeItem("jwt");
          window.location.reload();
          alert("요청 권한이 없습니다");
        }
      });
  };

  useEffect(() => {
    let idx = Math.floor(Math.random() * 10);
    if (inputTitle.current) inputTitle.current.value = defaultGameTitle[idx];

    setIsPublic(true);
    setMaxPlayer(8);
    setDiscussionTime(60);
  }, [openRoomMake]);

  useEffect(() => {
    if (inputPassword.current) {
      inputPassword.current.value = "";
    }
  }, [isPublic]);

  return (
    <>
      <Modal
        dimmer="inverted"
        size="tiny"
        open={openRoomMake}
        trigger={
          <button className={`${styles.button} ${styles["btn-2"]}`}>
            방 만들기
          </button>
        }
        onClose={() => setOpenRoomMake(false)}
        onOpen={() => setOpenRoomMake(true)}
        className="make-body"
        style={{ height: "550px" }}
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
              <div className="room-make-box-title">방 만들기</div>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Field style={{ width: "80%" }}>
                    <label>방 제목</label>
                    <input
                      ref={inputTitle}
                      style={{ width: "100%" }}
                      placeholder="방 제목 "
                      required
                      maxLength="8"
                    />
                  </Form.Field>

                  <Form.Checkbox
                    className="public-check"
                    label="비공개"
                    onChange={(e, data) => {
                      setIsPublic(!data.checked);
                    }}
                  />
                </div>

                <Form.Group widths={2}>
                  <Form.Field>
                    <label>최대 인원</label>
                    <Dropdown
                      selection
                      fluid
                      className="select-box"
                      options={maxPlayerOptions}
                      defaultValue={8}
                      onChange={(e, { value }) => {
                        setMaxPlayer(value);
                      }}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>토론 시간</label>
                    <Dropdown
                      selection
                      fluid
                      className="select-box"
                      options={timeOptions}
                      defaultValue={60}
                      onChange={(e, { value }) => {
                        setDiscussionTime(value);
                      }}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Field>
                  <label>비밀번호</label>
                  <input
                    ref={inputPassword}
                    placeholder="비밀번호"
                    disabled={isPublic}
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
                    makeRoom();
                  }}
                >
                  확인
                </button>
                <button
                  className="create-room-btn cancel"
                  onClick={() => setOpenRoomMake(false)}
                >
                  취소
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default RoomMakeBtn;
