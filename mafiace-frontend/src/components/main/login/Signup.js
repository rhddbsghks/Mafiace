import { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Message,
} from "semantic-ui-react";

import axios from "axios";

const Signup = ({ clickSignup }) => {
  const [values, setValues] = useState({
    userId: "",
    password: "",
    email: "",
    nickname: "",
  });

  const [validId, setValidId] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validMail, setValidMail] = useState(false);
  const [validNick, setValidNick] = useState(false);

  const [color, setColor] = useState("red");
  const [msg, setMsg] = useState("");

  // 정규식 유효성 검사 함수
  const idVal = (item) => {
    let regExp = /^.{5,12}$/; // 5자 이상 12자 이하
    if (item.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  };
  const pwVal = (item) => {
    let regExp = /^.{8,16}$/; // 8자 이상 16자 이하
    if (item.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  };
  const mailVal = (item) => {
    let regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; // 이메일 정규식
    if (item.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  };
  const nickVal = (item) => {
    let regExp = /^.{2,12}$/; // 2자 이상 10자 이하
    if (item.match(regExp) != null) {
      return true;
    } else {
      return false;
    }
  };

  // onChange state 값 갱신
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 회원가입 클릭
  const onClickSignup = () => {
    console.log(values);
    axios
      .post("http://localhost:8080/api/user", values, {
        headers: { "Content-Type": `application/json` },
      })
      .then((res) => {
        // console.dir(res);
        clickSignup();
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  // 유효성 검사 & 중복 검사 api
  useEffect(() => {
    setValidNick(false);
    setColor("red");
    if (nickVal(values.nickname)) {
      axios
        .get("http://localhost:8080/api/user/nicknamecheck", {
          params: { nickname: values.nickname },
        })
        .then((res) => {
          // console.log(res);
          setValidNick(true);
          setColor("green");
          setMsg("사용 가능한 닉네임입니다.");
        })
        .catch((err) => {
          // console.log(err.response);
          setMsg("중복된 닉네임입니다.");
        });
    } else {
      setMsg("닉네임은 2자 이상 10자 이하로 입력해야 합니다.");
    }
  }, [values.nickname]);
  useEffect(() => {
    setValidMail(false);
    setColor("red");
    if (mailVal(values.email)) {
      axios
        .get("http://localhost:8080/api/user/emailcheck", {
          params: { email: values.email },
        })
        .then((res) => {
          // console.log(res);
          setValidMail(true);
          setColor("green");
          setMsg("사용 가능한 이메일입니다.");
        })
        .catch((err) => {
          // console.log(err.response);
          setMsg("중복된 이메일입니다.");
        });
    } else {
      setMsg("유효한 이메일 양식이 아닙니다.");
    }
  }, [values.email]);
  useEffect(() => {
    if (pwVal(values.password)) {
      setValidPw(true);
      setColor("green");
      setMsg("사용 가능한 패스워드입니다.");
    } else {
      setValidPw(false);
      setColor("red");
      setMsg("비밀번호는 8자 이상 16자 이하로 입력해야 합니다.");
    }
  }, [values.password]);
  useEffect(() => {
    setValidId(false);
    setColor("red");
    if (idVal(values.userId)) {
      axios
        .get("http://localhost:8080/api/user/idcheck", {
          params: { userId: values.userId },
        })
        .then((res) => {
          // console.log(res);
          setValidId(true);
          setColor("green");
          setMsg("사용 가능한 아이디입니다.");
        })
        .catch((err) => {
          // console.dir(err);
          setMsg("중복된 아이디입니다.");
        });
    } else {
      setMsg("아이디는 5자 이상 12자 이하로 입력해야 합니다.");
    }
  }, [values.userId]);

  return (
    <>
      <h1>회원가입</h1>

      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Group unstackable widths={2}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="ID"
                  placeholder="아이디를 입력하세요"
                  name="userId"
                  value={values.userId}
                  onChange={handleChange}
                  error={!validId}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="PW"
                  placeholder="패스워드를 입력하세요"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={!validPw}
                />
              </Form.Group>

              <Form.Group widths={2}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="e-mail"
                  placeholder="이메일을 입력하세요"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  error={!validMail}
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="NickName"
                  placeholder="닉네임을 입력하세요"
                  name="nickname"
                  value={values.nickname}
                  onChange={handleChange}
                  error={!validNick}
                />
              </Form.Group>
            </Form>

            {validId && validPw && validMail && validNick ? (
              <Message color="green" size="tiny">
                완벽해요! 이제 회원가입 버튼을 눌러주세요.
              </Message>
            ) : (
              <Message color={color} size="tiny">
                {msg}
              </Message>
            )}
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={onClickSignup}
                content="Sign Up"
                icon="signup"
                inverted
                color="red"
                disabled={!(validId && validPw && validMail && validNick)}
              />
              <Button
                onClick={clickSignup}
                content="뒤로가기"
                inverted
                color="purple"
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
