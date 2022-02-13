import React, { useState } from "react";
import { Button, Divider, Form, Grid, Segment, Popup } from "semantic-ui-react";
import FindId from "./FindId";
import FindPw from "./FindPw";
import Signup from "./Signup";
import styles from "./styles.module.css";
import { useSpring, a } from "@react-spring/web";
import axios from "axios";
import "./logo.css";
import btns from "../room/room.module.css";

const LoginForm = ({ getLogin }) => {
  const [id, setId] = useState(true); // ID 찾기
  const [pw, setPw] = useState(true); // PW 찾기
  const [up, setUp] = useState(true); // 회원가입
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });

  const clearValues = () => {
    setValues({
      userId: "",
      password: "",
    });
  };

  // Popup 관리
  const [idOpen, setIdOpen] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  // 로그인 클릭
  const onClickLogin = () => {
    axios
      .post("/mafiace/api/auth/login", values, {
        headers: { "Content-Type": `application/json` },
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(jwt(res.data.accessToken));
        localStorage.setItem("jwt", res.data.accessToken);
        getLogin(true);
        clearValues();
      })
      .catch((err) => {
        // console.log(err.response.data);
        if (err.response.data.status === 404) {
          setMsg("존재하지 않는 ID 입니다.");
          setIdOpen(true);
        } else if (err.response.data.status === 401) {
          setMsg("비밀번호가 틀렸습니다.");
          setPwOpen(true);
        }
      });
  };

  // 회원가입 클릭
  const clickSignup = () => {
    setUp(!up);
    set((state) => !state);
    clearValues();
  };

  // ID찾기 클릭
  const clickFindId = () => {
    setId(!id);
    set((state) => !state);
    clearValues();
  };

  // PW찾기 클릭
  const clickFindPw = () => {
    setPw(!pw);
    set((state) => !state);
    clearValues();
  };

  // onChange state 값 갱신
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === "userId") setIdOpen(false);
    if (name === "password") setPwOpen(false);
  };

  return (
    <div>
      {up && id && pw ? (
        <a.div style={{ opacity: opacity.to((o) => 1 - o), transform }}>
          <h1></h1>
          <Segment placeholder className={styles["home-bottom"]}>
            <Grid
              columns={2}
              relaxed="very"
              stackable
              style={{ height: "350px" }}
            >
              <Grid.Column style={{ width: "100%" }}>
                <Form className="login-form">
                  <Popup
                    content={msg}
                    open={idOpen}
                    trigger={
                      <Form.Input
                        icon="user"
                        iconPosition="left"
                        label="ID"
                        placeholder="아이디를 입력하세요."
                        name="userId"
                        value={values.userId}
                        onChange={handleChange}
                      />
                    }
                    position="bottom center"
                    style={{ color: "red" }}
                  />
                  <Popup
                    content={msg}
                    open={pwOpen}
                    trigger={
                      <Form.Input
                        icon="lock"
                        iconPosition="left"
                        label="PW"
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") onClickLogin();
                        }}
                      />
                    }
                    position="bottom center"
                    style={{ color: "red" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      maxWidth: "300px",
                      margin: "auto",
                      marginTop: "5%",
                    }}
                  >
                    <div
                      className="form-back"
                      onClick={clickFindId}
                      style={{ fontSize: "1.5em" }}
                    >
                      아이디 찾기
                    </div>
                    <div
                      className="form-back"
                      onClick={clickFindPw}
                      style={{ fontSize: "1.5em" }}
                    >
                      비밀번호 찾기
                    </div>
                    <div
                      className="form-back"
                      onClick={clickSignup}
                      style={{ fontSize: "1.5em" }}
                    >
                      회원가입
                    </div>
                    {/* <Button
                      onClick={clickFindId}
                      content="Find ID"
                      inverted
                      color="blue"
                    />
                    <Button
                      onClick={clickFindPw}
                      content="Find PW"
                      inverted
                      color="blue"
                    /> */}
                  </div>
                </Form>
              </Grid.Column>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  className={`${btns.button} ${btns["btn-2"]}`}
                  style={{ margin: "auto", width: "60%", height: "60%" }}
                  onClick={onClickLogin}
                >
                  로그인
                </button>
              </div>

              {/* <Grid.Column textAlign="center" verticalAlign="middle">
                <Button.Group>
                  <Button
                    onClick={onClickLogin}
                    content="LOGIN"
                    inverted
                    color="green"
                  />
                  <Button
                    onClick={clickSignup}
                    content="Sign Up"
                    // icon="signup"
                    inverted
                    color="red"
                  ></Button>
                </Button.Group>
              </Grid.Column> */}
            </Grid>
            {/* <Divider vertical>Or</Divider> */}
          </Segment>
        </a.div>
      ) : null}
      {up ? null : (
        <a.div style={{ opacity, transform, rotateX: "180deg" }}>
          <Signup clickSignup={clickSignup} />
        </a.div>
      )}
      {id ? null : (
        <a.div style={{ opacity, transform, rotateX: "180deg" }}>
          <FindId clickFindId={clickFindId} clickFindPw={clickFindPw} />
        </a.div>
      )}
      {pw ? null : (
        <a.div style={{ opacity, transform, rotateX: "180deg" }}>
          <FindPw clickFindPw={clickFindPw} />
        </a.div>
      )}
    </div>
  );
};

export default LoginForm;
