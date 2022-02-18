import { useEffect, useState } from "react";
import { Divider, Icon, Table, Statistic } from "semantic-ui-react";

import axios from "axios";
import Honor from "./Honor";
import Loader from "../../common/Loader";

const RecordCompo = () => {
  const korJobName = {
    Police: "경찰",
    Doctor: "의사",
    Citizen: "시민",
    Mafia: "마피아",
  };
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

  const tearList = [
    "bronze4",
    "bronze3",
    "bronze2",
    "bronze1",
    "silver4",
    "silver3",
    "silver2",
    "silver1",
    "gold4",
    "gold3",
    "gold2",
    "gold1",
    "platinum4",
    "platinum3",
    "platinum2",
    "platinum1",
    "rainbow4",
    "rainbow3",
    "rainbow2",
    "rainbow1",
  ];

  const [latestLog, setLatestlog] = useState([]);
  const [myHonors, setMyHonors] = useState(new Set());
  const [winlose, setWinlose] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "/mafiace/api/user/userRecord",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        }
      )
      .then(({ data }) => {
        setMyHonors(new Set(data.honors));
        setLatestlog(data.records);
        setWinlose(data.userRecords);
        setLoading(false);
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
            <div style={{ fontSize: "3em" }}>
              <Icon name="bar chart" style={{ fontSize: "0.5em" }} />
              전적
            </div>
          </Divider>

          <div style={{ margin: "auto", width: "80%" }}>
            <Statistic.Group
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                margin: "auto",
              }}
            >
              <Statistic style={{ width: "17%", margin: "auto" }}>
                <Statistic.Value style={{ fontSize: "6em !important" }}>
                  {winlose.winCount}
                </Statistic.Value>
                <Statistic.Label
                  style={{
                    color: "#2f33e9f1",
                    fontSize: "30px",
                  }}
                >
                  Win
                </Statistic.Label>
              </Statistic>
              <Statistic style={{ width: "17%", margin: "auto" }}>
                <Statistic.Value style={{ fontSize: "6em !important" }}>
                  {winlose.loseCount}
                </Statistic.Value>
                <Statistic.Label
                  style={{
                    color: "#d36d97d8",
                    fontSize: "30px",
                  }}
                >
                  Lose
                </Statistic.Label>
              </Statistic>
              <Statistic style={{ width: "17%", margin: "auto" }}>
                <Statistic.Value style={{ fontSize: "6em !important" }}>
                  {winlose.loseCount + winlose.winCount}
                </Statistic.Value>
                <Statistic.Label
                  style={{
                    color: "#7f7c8293",
                    fontSize: "30px",
                  }}
                >
                  Total
                </Statistic.Label>
              </Statistic>
            </Statistic.Group>

            <div style={{ textAlign: "center", marginTop: "5%" }}>
              <Icon name="chart line" />
              <span style={{ fontSize: "2em" }}> 최근 10게임</span>
            </div>

            <Table>
              <thead
                style={{ textAlign: "center", backgroundColor: "purple-200" }}
              >
                <tr>
                  <th style={{ fontSize: "2rem" }}>직업</th>
                  <th style={{ fontSize: "2rem" }}>결과</th>
                  <th style={{ fontSize: "2rem" }}>플레이 시간</th>
                </tr>
              </thead>
              <tbody>
                {latestLog.map((item) => {
                  return (
                    <tr
                      className={`bg-white border-2 border-gray-200 ${
                        item.win ? "win" : "lose"
                      }`}
                      style={{
                        textAlign: "center",
                        borderBottom: "1px dotted gray",
                      }}
                    >
                      <td
                        className="px-4 py-3"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "50px",
                            margin: "1% auto",
                          }}
                        >
                          <img
                            src={`img/${item.role}.png`}
                            alt=""
                            height="100%"
                          />
                        </div>

                        <span
                          className="hover:text-blue-500 cursor-pointer"
                          style={{ fontSize: "2em" }}
                        >
                          {korJobName[item.role]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.win === true ? (
                          <p
                            className="hover:text-blue-500 cursor-pointer"
                            style={{ fontSize: "4em", color: "#2f33e9f1" }}
                          >
                            Win
                          </p>
                        ) : (
                          <p
                            className="hover:text-blue-500 cursor-pointer"
                            style={{ fontSize: "4em", color: "#d36d97d8" }}
                          >
                            Lose
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3" style={{ fontSize: "3em" }}>
                        {item.playTime}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <Divider horizontal style={{ marginTop: "10%" }}>
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

export default RecordCompo;
