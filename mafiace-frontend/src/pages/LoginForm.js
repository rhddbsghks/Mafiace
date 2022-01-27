import React, { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import FindId from "./FindId";
import FindPw from "./FindPw";
import Signup from "./Signup";

import { useSpring, a } from "@react-spring/web";
import axios from "axios";

const LoginForm = ({ login, getLogin }) => {
  const [id, setId] = useState(true); // ID 찾기
  const [pw, setPw] = useState(true); // PW 찾기
  const [up, setUp] = useState(true); // 회원가입
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const onClick = () => {
    console.log(values);
    // getLogin(!login);
    axios
      .post("http://localhost:8080/api/auth/login", values)
      .then((res) => console.log(res));
  };
  const clickSignup = () => {
    setUp(!up);
    set((state) => !state);
  };
  const clickFindId = () => {
    setId(!id);
    set((state) => !state);
  };
  const clickFindPw = () => {
    setPw(!pw);
    set((state) => !state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      {up && id && pw ? (
        <a.div style={{ opacity: opacity.to((o) => 1 - o), transform }}>
          <h1>로그인</h1>
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Form>
                  <Form.Input
                    icon="user"
                    iconPosition="left"
                    label="ID"
                    placeholder="type your ID here"
                    name="userId"
                    value={values.userId}
                    onChange={handleChange}
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="PW"
                    placeholder="type your PW here"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />

                  <Button
                    onClick={onClick}
                    content="LOGIN"
                    inverted
                    color="green"
                  />
                </Form>
              </Grid.Column>

              <Grid.Column textAlign="center" verticalAlign="middle">
                <Button
                  onClick={clickSignup}
                  content="Sign Up"
                  icon="signup"
                  inverted
                  color="red"
                ></Button>

                <p></p>
                <Button.Group>
                  <Button
                    onClick={clickFindId}
                    content="Find ID"
                    inverted
                    color="blue"
                  />
                  <Button.Or text="OR" />
                  <Button
                    onClick={clickFindPw}
                    content="Find PW"
                    inverted
                    color="blue"
                  />
                </Button.Group>
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
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
          <FindId clickFindId={clickFindId} />
        </a.div>
      )}
      {pw ? null : (
        <a.div style={{ opacity, transform, rotateX: "180deg" }}>
          <FindPw clickFindPw={clickFindPw} />
        </a.div>
      )}
    </>
  );
};

export default LoginForm;
