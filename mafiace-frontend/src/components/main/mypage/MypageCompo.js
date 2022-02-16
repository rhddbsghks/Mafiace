import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Icon,
  Container,
  Image,
  Form,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import Loader from "../../common/Loader";
import jwt from "jwt-decode";

const MypageCompo = () => {
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [tear, setTear] = useState("");
  const [rating, setRating] = useState("");
  const beforePassword = useRef();
  const afterPassword = useRef();
  const curPassword = useRef();
  const inputNickname = useRef();
  const userId = jwt(localStorage.getItem("jwt")).sub;

  const tearList = [
    "bronze4",
    "bronze3",
    "bronze2",
    "bronze1",
    "silver4",
    "silver3",
    "silver2",
    "silver1",
    "gold4",
    "gold3",
    "gold2",
    "gold1",
    "platinum4",
    "platinum3",
    "platinum2",
    "platinum1",
    "rainbow4",
    "rainbow3",
    "rainbow2",
    "rainbow1",
  ];

  useEffect(() => {
    axios
      .post(
        "/mafiace/api/user/userinfo",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        setLoading(false);
        setForm(res.data);
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        }
      });

    axios
      .get("/mafiace/api/user/rating", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { userId: jwt(localStorage.getItem("jwt")).sub },
      })
      .then(({ data }) => {
        setRating(data.message);
        let idx = Math.floor((data.message - 1000) / 100);
        idx = idx < 0 ? 0 : idx;
        idx = idx > 19 ? 19 : idx;
        setTear(tearList[idx]);
      });
  }, []);

  const modifyPassword = () => {
    axios
      .patch(
        "/mafiace/api/user/update/password",
        {
          userId: userId,
          beforePassword: beforePassword.current.value,
          password: afterPassword.current.value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then(() => {
        alert("비밀번호 변경이 완료되었습니다!");
        setPasswordModal(false);
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        }
        if (response.status === 410) {
          alert(
            "비밀번호 변경에 실패하였습니다. 현재 비밀번호를 다시 확인해주세요."
          );
        }
      });
  };

  const modifyNickname = () => {
    axios
      .patch(
        "/mafiace/api/user/update/nickname",
        {
          userId: userId,
          nickname: inputNickname.current.value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        alert("닉네임 변경이 완료되었습니다. 다시 로그인 해주세요.");
        window.location.reload();
        setNicknameModal(false);
        localStorage.removeItem("jwt");
        window.location.href = "/";
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        } else if (response.status === 410) {
          alert("닉네임 변경에 실패하였습니다.");
        }
      });
  };
  const deleteUser = () => {
    axios
      .post(
        "/mafiace/api/user/deleteaccount",
        {
          userId: userId,
          password: curPassword.current.value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        alert("회원탈퇴가 완료되었습니다! 한 달 후에 완전 삭제됩니다.");
        setDeleteModal(false);
        localStorage.removeItem("jwt");
        window.location.href = "/";
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        } else if (response.status === 400) {
          alert("이미 탈퇴 신청된 계정입니다.");
        } else if (response.status === 401) {
          alert("회원탈퇴에 실패하였습니다. 비밀번호를 다시 확인해주세요.");
        }
      });
  };
  return (
    <div style={{ width: "95%", margin: "auto" }}>
      {loading ? (
        <Loader msg="로딩 중..." />
      ) : (
        <>
          <Image src="" size="small" />
          <div
            style={{
              textAlign: "left",
              margin: "5%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "350px",
              }}
            >
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  borderRadius: "140em",
                  marginBottom: "10%",
                  width: "50%",
                  fontSize: "3em",
                  textAlign: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={`img/tear/${tear}.png`}
                    alt=""
                    width="30%"
                    style={{ margin: "5% auto" }}
                  />
                  <span>{tear}</span>
                  <span style={{ fontSize: "0.7em" }}>({rating}점)</span>
                </div>
              </Container>
            </div>
            <div
              style={{
                display: "flex",
                width: "70%",
                margin: "5% auto",
                marginBottom: "1%",
              }}
            >
              <Container
                aria-hidden="true"
                style={{
                  width: "20%",
                  margin: "auto",
                  fontSize: "4em",
                  textAlign: "center",
                }}
              >
                아이디
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  fontSize: "5em",
                  width: "70%",
                  textAlign: "center",
                }}
              >
                <p style={{ marginLeft: "10px" }}>{form.userId}</p>
              </Container>
            </div>

            <div style={{ display: "flex", width: "70%", margin: "1% auto" }}>
              <Container
                aria-hidden="true"
                style={{
                  width: "20%",
                  margin: "auto",
                  fontSize: "4em",
                  textAlign: "center",
                }}
              >
                닉네임
              </Container>
              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  // border: "10px solid #D5C2EE",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  width: "70%",
                  fontSize: "5em",
                  textAlign: "center",
                }}
              >
                <div>
                  <p style={{ marginLeft: "10px" }}>{form.nickname}</p>
                </div>
              </Container>
            </div>

            <div style={{ display: "flex", width: "70%", margin: "1% auto" }}>
              <Container
                aria-hidden="true"
                style={{
                  width: "20%",
                  margin: "auto",
                  fontSize: "4em",
                  textAlign: "center",
                }}
              >
                이메일
              </Container>

              <Container
                style={{
                  backgroundColor: "#F4EBFC",
                  borderRadius: "10px",
                  marginBottom: "1%",
                  width: "70%",
                  fontSize: "5em",
                  textAlign: "center",
                }}
              >
                <div>
                  <p style={{ marginLeft: "10px" }}>{form.email}</p>
                </div>
              </Container>
            </div>
          </div>

          <div
            style={{
              width: "60%",
              display: "flex",
              justifyContent: "space-around",
              margin: "auto",
            }}
          >
            <Modal
              dimmer="inverted"
              size="tiny"
              open={passwordModal}
              trigger={
                <Button
                  content="비밀번호 변경"
                  color="blue"
                  style={{
                    fontSize: "2em",
                    padding: "0 20px",
                    height: "50%",
                    margin: "auto 0",
                  }}
                />
              }
              onClose={() => setPasswordModal(false)}
              onOpen={() => setPasswordModal(true)}
              className="make-body"
              style={{ height: "400px" }}
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
                    <div className="room-make-box-title">비밀번호 변경</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Form.Field style={{ width: "80%", margin: "auto" }}>
                        <label>현재 비밀번호</label>
                        <input
                          type="password"
                          ref={beforePassword}
                          style={{ width: "100%" }}
                          placeholder="현재 비밀번호 "
                          required
                          minLength="8"
                          maxLength="16"
                        />
                      </Form.Field>

                      <Form.Field style={{ width: "80%", margin: "auto" }}>
                        <label>변경할 비밀번호</label>
                        <input
                          type="password"
                          ref={afterPassword}
                          style={{ width: "100%" }}
                          placeholder="변경할 비밀번호"
                          required
                          minLength="8"
                          maxLength="16"
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
                          modifyPassword();
                        }}
                      >
                        변경
                      </button>
                      <button
                        className="create-room-btn cancel"
                        onClick={() => setPasswordModal(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </Modal>

            <Modal
              dimmer="inverted"
              size="tiny"
              open={nicknameModal}
              trigger={
                <Button
                  content="닉네임 수정"
                  color="green"
                  style={{
                    fontSize: "2em",
                    padding: "0 20px",
                    height: "50%",
                    margin: "auto 0",
                  }}
                />
              }
              onClose={() => setNicknameModal(false)}
              onOpen={() => setNicknameModal(true)}
              className="make-body"
              style={{ height: "350px" }}
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
                    <div className="room-make-box-title">닉네임 변경</div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Field style={{ width: "80%" }}>
                        <label>변경할 닉네임</label>
                        <input
                          ref={inputNickname}
                          style={{ width: "100%" }}
                          placeholder="변경할 닉네임"
                          required
                          minLength="2"
                          maxLength="8"
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
                          modifyNickname();
                        }}
                      >
                        변경
                      </button>
                      <button
                        className="create-room-btn cancel"
                        onClick={() => setNicknameModal(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </Modal>

            <Modal
              dimmer="inverted"
              size="tiny"
              open={deleteModal}
              trigger={
                <Button
                  content="회원탈퇴"
                  color="red"
                  style={{
                    fontSize: "2em",
                    padding: "0 20px",
                    height: "50%",
                    margin: "auto 0",
                  }}
                />
              }
              onClose={() => setDeleteModal(false)}
              onOpen={() => setDeleteModal(true)}
              className="make-body"
              style={{ height: "350px" }}
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
                    <div className="room-make-box-title">
                      비밀번호를 입력해주세요.
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Form.Field style={{ width: "80%" }}>
                        <label>비밀번호</label>
                        <input
                          ref={curPassword}
                          type="password"
                          style={{ width: "100%" }}
                          placeholder="비밀번호"
                          required
                          minLength="8"
                          maxLength="16"
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
                          deleteUser();
                        }}
                      >
                        탈퇴
                      </button>
                      <button
                        className="create-room-btn cancel"
                        onClick={() => setDeleteModal(false)}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </Modal>
          </div>
          <br />
          <br />
          <br />
          <br />
        </>
      )}
    </div>
  );
};

export default MypageCompo;
