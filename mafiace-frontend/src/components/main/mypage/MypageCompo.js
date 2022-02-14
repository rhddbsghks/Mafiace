import React, { useState, useEffect } from "react";
import {
  Divider,
  Header,
  Icon,
  Table,
  Statistic,
  Image,
} from "semantic-ui-react";
import axios from "axios";
import Loader from "../../common/Loader";
// import jwt from "jwt-decode";

const MypageCompo = () => {
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(true);

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
        // console.log(res.data);
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
  }, []);

  useEffect(() => {
    axios
      .post(
        "/mafiace/api/user/userRecord",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          alert("만료된 토큰입니다.");
          localStorage.removeItem("jwt");
          window.location.href = "/";
        }
      });
    // console.log(form);
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
          <Table definition style={{ width: "70%", marginLeft: "15%" }}>
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
                <Table.Cell style={{ fontSize: "150%" }}>
                  {form.userId}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{ fontSize: "150%", backgroundColor: "#D2D2FF" }}
                >
                  Nick Name
                </Table.Cell>
                <Table.Cell style={{ fontSize: "150%" }}>
                  {form.nickname}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  style={{ fontSize: "150%", backgroundColor: "#D2D2FF" }}
                >
                  E-mail
                </Table.Cell>
                <Table.Cell style={{ fontSize: "150%" }}>
                  {form.email}
                </Table.Cell>
              </Table.Row>
              <Table.Row></Table.Row>
            </Table.Body>
          </Table>
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
          {/* <Segment.Group raised>
      <Segment>승리</Segment>
      <Segment>패배</Segment>
      <Segment>+</Segment>
    </Segment.Group> */}
        </>
      )}
    </div>
  );
};

export default MypageCompo;
