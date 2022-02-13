import { useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import styles from "./styles.module.css";

const FindId = ({ clickFindId, clickFindPw }) => {
  const [email, setEmail] = useState("");

  // onChange state 값 갱신
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onclick = () => {
    console.log(email);
    alert("ID 찾기 api 없음");
  };

  return (
    <>
      <h1>아이디 찾기</h1>

      <Segment
        placeholder
        className={styles["home-bottom"]}
        style={{ height: "350px", justifyContent: "flex-start" }}
      >
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column
            style={{
              width: "100%",
              display: "flex",
              height: "100px",
              marginTop: "10%",
              justifyContent: "center",
            }}
          >
            <Form className="findId-form">
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Email"
                placeholder="이메일을 입력하세요."
                name="userId"
                value={email}
                onChange={handleChange}
                style={{ width: "80%" }}
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
            onClick={clickFindId}
          >
            뒤로가기
          </div>
          <div
            className="form-back"
            style={{
              position: "absolute",
              top: "5%",
              right: "1%",
              fontSize: "2em",
            }}
            onClick={() => {
              clickFindId();
              clickFindPw();
            }}
          >
            비밀번호 찾기
          </div>
        </Grid>
      </Segment>
    </>
  );
};

export default FindId;
