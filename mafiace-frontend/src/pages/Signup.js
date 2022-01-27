import { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

import axios from "axios";

const Signup = ({ clickSignup }) => {
  const [values, setValues] = useState({
    userId: "",
    password: "",
    email: "",
    nickname: "",
  });
  const [valid, setValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onClick = () => {
    console.log(values);
    // getLogin(!login);

    axios
      .post("http://localhost:8080/api/user/register", values, {
        headers: { "Content-Type": `application/json` },
      })
      .then((res) => {
        console.log(res);
        setValid(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data === "이미 가입된 아이디입니다.") {
          console.log("아이디 중복");
        }
      });

    if (valid) {
      clickSignup();
    }
  }; // 로그인

  return (
    <>
      <h1>회원가입</h1>

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
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="PW 확인"
                placeholder="type your PW here"
                type="password"
              />
              <Form.Input
                icon="user"
                iconPosition="left"
                label="e-mail"
                placeholder="type your e-mail here"
                name="email"
                value={values.email}
                onChange={handleChange}
              />

              <Form.Input
                icon="user"
                iconPosition="left"
                label="NickName"
                placeholder="type your NickName here"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={onClick}
                content="Sign Up"
                icon="signup"
                inverted
                color="red"
              />
            </Button.Group>
          </Grid.Column>
        </Grid>
        <Divider vertical>and</Divider>
      </Segment>
    </>
  );
};

export default Signup;
