import axios from "axios";
import { useState } from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";
import styles from "./styles.module.css";
import Loader from "../../common/Loader";

const FindPw = ({ clickFindPw }) => {
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    userId: "",
    email: "",
  });

  // onChange state 값 갱신
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onclick = () => {
    console.log(values);
    axiosPatch();
  };

  const axiosPatch = () => {
    setSending(true);
    axios
      .patch("/mafiace/api/user/password", values)
      .then((res) => {
        console.log(res);
        setSending(false);
        window.alert(
          `${values.email}로 임시 비밀번호가 발송되었습니다.\n메일 확인 후 임시 비밀번호로 로그인 해주세요.`
        );

        clickFindPw();
      })
      .catch((err) => {
        console.log(err.response.data);
        window.alert("ID 또는 e-amil을 다시 한번 확인해주세요.");
      });
  };

  return (
    <>
      <h1>비밀번호 찾기</h1>

      <Segment
        placeholder
        className={styles["home-bottom"]}
        style={{ height: "350px", justifyContent: "flex-start" }}
      >
        {sending ? (
          <Loader msg={"이메일 전송중..."} />
        ) : (
          <Grid
            columns={2}
            relaxed="very"
            stackable
            // style={{ height: "350px" }}
          >
            <Grid.Column
              style={{
                width: "100%",
                display: "flex",
                height: "100px",
                marginTop: "10%",
                justifyContent: "center",
              }}
            >
              <Form className="findPw-form">
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="ID"
                  placeholder="아이디를 입력하세요."
                  name="userId"
                  style={{ width: "80%" }}
                  onChange={handleChange}
                />
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Email"
                  placeholder="이메일을 입력하세요."
                  style={{ width: "80%" }}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form>

              <Button
                onClick={onclick}
                content="찾기"
                inverted
                color="violet"
                style={{
                  fontSize: "2em",
                  padding: "0 20px",
                  height: "50%",
                  margin: "auto 0",
                }}
              />
            </Grid.Column>

            <div
              className="form-back"
              style={{
                position: "absolute",
                top: "5%",
                left: "1%",
                fontSize: "2em",
              }}
              onClick={clickFindPw}
            >
              뒤로가기
            </div>
          </Grid>
        )}
      </Segment>
      {/* <h1>비밀번호 찾기</h1>

      <Segment placeholder className={styles["home-bottom"]}>
        <Grid columns={2} relaxed="very" stackable style={{ height: "350px" }}>
          <Grid.Column
            style={{
              width: "100%",
              display: "flex",
              height: "100px",
              marginTop: "10%",
              justifyContent: "center",
            }}
          >
            <Form className="findPw-form">
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
                icon="user"
                iconPosition="left"
                label="e-mail"
                placeholder="type your e-mail here"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </Form>
          </Grid.Column>

          <Grid.Column textAlign="center" verticalAlign="middle">
            <Button.Group>
              <Button
                onClick={onclick}
                content="Find PW"
                inverted
                color="blue"
              />
              <Button
                onClick={clickFindPw}
                content="뒤로가기"
                inverted
                color="purple"
              />
            </Button.Group>
          </Grid.Column>
        </Grid>
      </Segment> */}
    </>
  );
};

export default FindPw;
