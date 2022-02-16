import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Header,
  Icon,
  Table,
  Container,
  Statistic,
  Image,
  Form,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
import Loader from "../../common/Loader";
import Honor from "./Honor";
import jwt from "jwt-decode";

const MypageCompo = () => {
  const honors = [
    "citizen3Play",
    "police3Play",
    "doctor3Play",
    "mafia3Play",
    "citizen10Play",
    "police10Play",
    "doctor10Play",
    "mafia10Play",
    "firstWin",
    "investigate10",
    "save10",
    "kill10",
  ];
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myHonors, setMyHonors] = useState(new Set());
  const [passwordModal, setPasswordModal] = useState(false);
  const [nicknameModal, setNicknameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const beforePassword = useRef();
  const afterPassword = useRef();
  const curPassword = useRef();
  const inputNickname = useRef();
  const userId = jwt(localStorage.getItem("jwt")).sub;

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
        console.log(res.data);
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
<<<<<<< HEAD
    // console.log(form);
=======
>>>>>>> ac6b4240da33a5d9af05d530187bcc15e386b829

    axios
      .post(
        "/mafiace/api/user/userRecord",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then(({ data }) => {
        console.log(data);
        setMyHonors(new Set(data.honors));
      })
      .catch(({ response }) => {
        if (
          response.status === 500 ||
          response.status === 401 ||
          response.status === 403
        ) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        }
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
        alert("닉네임 변경이 완료되었습니다!");
        setNicknameModal(false);
      })
      .catch(({ response }) => {
<<<<<<< HEAD
        console.log(response);
      });
  }, []);
=======
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
>>>>>>> ac6b4240da33a5d9af05d530187bcc15e386b829

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      {loading ? (
        <Loader msg="로딩 중..." />
      ) : (
        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="tag" />
              회원 정보
            </Header>
          </Divider>
          <br></br>
          <Image src="" size="small" />
          {/* <Table definition style={{ width: "70%", marginLeft: "15%" }}>
            <Table.Body>
              <Table.Row>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    width: "30%",
                    backgroundColor: "#D2D2FF",
                  }}
                >
                  ID
                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    backgroundColor: "#CEBEE1",
                    border: "none",
                  }}
                >
                  {form.userId}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    backgroundColor: "#D2D2FF",
                  }}
                >
                  닉네임
                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    backgroundColor: "#CEBEE1",
                    border: "none",
                  }}
                >
                  {form.nickname}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    backgroundColor: "#D2D2FF",
                  }}
                >
                  E-mail
                </Table.Cell>
                <Table.Cell
                  style={{
                    fontSize: "150%",
                    backgroundColor: "#CEBEE1",
                    border: "none",
                  }}
                >
                  {form.email}
                </Table.Cell>
              </Table.Row>
              <Table.Row></Table.Row>
            </Table.Body>
<<<<<<< HEAD
          </Table> */}
          <h2
            style={{
              textAlign: "left",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            <Container
              aria-hidden="true"
              style={{
                float: "left",
                width: "20%",
                padding: "2%",
                paddingLeft: "5%",
              }}
            >
              ID
            </Container>
            <Container
              style={{
                backgroundColor: "#F4EBFC",
                // border: "10px solid #D5C2EE",
                borderRadius: "10px",
                marginBottom: "1%",
                padding: "2%",
                paddingLeft: "5%",
                width: "80%",
              }}
            >
              <p style={{ marginLeft: "10px" }}>{form.userId}</p>
            </Container>

            <Container
              aria-hidden="true"
              style={{
                float: "left",
                width: "20%",
                padding: "2%",
                paddingLeft: "5%",
              }}
            >
              Nick Name
            </Container>
            <Container
              style={{
                backgroundColor: "#F4EBFC",
                // border: "10px solid #D5C2EE",
                borderRadius: "10px",
                marginBottom: "1%",
                padding: "2%",
                paddingLeft: "5%",
                width: "80%",
              }}
            >
              <div>
                <p style={{ marginLeft: "10px" }}>{form.nickname}</p>
              </div>
            </Container>
            <Container
              aria-hidden="true"
              style={{
                float: "left",
                width: "20%",
                padding: "2%",
                paddingLeft: "5%",
              }}
            >
              E-mail
            </Container>

            <Container
              style={{
                backgroundColor: "#F4EBFC",
                borderRadius: "10px",
                marginBottom: "1%",
                padding: "2%",
                paddingLeft: "5%",
                width: "80%",
              }}
            >
              <div>
                <p style={{ marginLeft: "10px" }}>{form.email}</p>
              </div>
            </Container>
          </h2>
=======
          </Table>
          <div style={{ textAlign: "center" }}>
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
                    <div className="room-make-box-title">
                      비밀번호를 입력해주십시오.
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

>>>>>>> ac6b4240da33a5d9af05d530187bcc15e386b829
          <br></br>

          <Divider horizontal>
            <Header as="h4">
              <Icon name="bar chart" />
              전적
            </Header>
          </Divider>
          <Statistic.Group style={{ justifyContent: "center", margin: "5%" }}>
            <Statistic>
              <Statistic.Value>22,321</Statistic.Value>
              <Statistic.Label
                style={{ color: "blue", fontSize: "25px", marginTop: "10%" }}
              >
                Win
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>31,200</Statistic.Value>
              <Statistic.Label
                style={{ color: "red", fontSize: "25px", marginTop: "10%" }}
              >
                Lose
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>60,020</Statistic.Value>
              <Statistic.Label
                style={{ color: "#006400", fontSize: "30px", marginTop: "10%" }}
              >
                Total
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Divider horizontal>
            <div style={{ fontSize: "3em" }}>
              <Icon name="trophy" style={{ fontSize: "0.5em" }} />
              업적
            </div>
          </Divider>

          <section
            style={{
              width: "90%",
              height: "700px",
              position: "relative",
              margin: "5% auto",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {honors.map((item) => (
              <Honor honorName={item} get={myHonors.has(item)} />
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default MypageCompo;
