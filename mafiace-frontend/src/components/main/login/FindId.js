import { useState, useRef } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import styles from "./styles.module.css";
import axios from "axios";

const FindId = ({ clickFindId, clickFindPw }) => {
  const [email, setEmail] = useState("");
  const [findId, setFindId] = useState("");

  // onChange state 값 갱신
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const onclick = () => {
    axios
      .get("/mafiace/api/user/id", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { email },
      })
      .then(({ data }) => {
        setFindId(data.userId);
      })
      .catch((err) => alert("해당하는 아이디가 없습니다."));
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
          {"" === findId ? null : (
            <div
              style={{ fontSize: "2em", marginLeft: "15%", marginTop: "5%" }}
            >
              회원님의 아이디: &nbsp;
              <span style={{ fontSize: "2em", fontWeight: "900" }}>
                {findId}
              </span>
            </div>
          )}

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
