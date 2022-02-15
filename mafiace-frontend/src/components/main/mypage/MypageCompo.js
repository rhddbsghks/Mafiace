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
import Honor from "./Honor";

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
                  Nick Name
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
          </Table>
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
