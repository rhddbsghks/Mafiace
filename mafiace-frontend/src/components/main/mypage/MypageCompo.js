import React, { useState, useEffect } from "react";
import {
  Divider,
  Header,
  Icon,
  Container,
  Statistic,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import Loader from "../../common/Loader";
// import jwt from "jwt-decode";

const MypageCompo = () => {
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winlose, setWinlose] = useState([]);

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
    // console.log(form);

    axios
      .post(
        "/mafiace/api/user/userRecord",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        // console.log(res.data.userRecords);
        setWinlose(res.data.userRecords);
      })
      .catch(({ error }) => {
        console.log(error);
      });
  }, []);

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
          <br></br>

          <Divider horizontal>
            <Header as="h4">
              <Icon name="bar chart" />
              전적
            </Header>
          </Divider>
          <br></br>

          <Statistic.Group style={{ justifyContent: "center" }}>
            <Statistic>
              <Statistic.Value>{winlose.winCount}</Statistic.Value>
              <Statistic.Label
                style={{ color: "blue", fontSize: "30px", marginTop: "10%" }}
              >
                Win
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>{winlose.loseCount}</Statistic.Value>
              <Statistic.Label
                style={{ color: "red", fontSize: "30px", marginTop: "10%" }}
              >
                Lose
              </Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>
                {winlose.loseCount + winlose.winCount}
              </Statistic.Value>
              <Statistic.Label
                style={{ color: "#006400", fontSize: "30px", marginTop: "10%" }}
              >
                Total
              </Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </>
      )}
    </div>
  );
};

export default MypageCompo;
