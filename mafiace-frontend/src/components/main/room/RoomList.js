import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
// import RoomComp from "./RoomComp";
import styles from "./room.module.css";
import "./pagination.css";
import Loader from "../../common/Loader";
import RoomComp from "./RoomComp";
import RoomMakeBtn from "./RoomMakeBtn";
import { Dropdown } from "semantic-ui-react";

const RoomList = ({ setIngame, ingame, setGameInfo, setToken }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [maxPlayer, setMaxPlayer] = useState(8);
  const [isPublic, setIsPublic] = useState(0);
  const [page, setPage] = useState(0);
  const [totalRoom, setTotalRoom] = useState(1);

  const maxPlayerOptions = [
    { key: "8", value: 8, text: "8명 이하" },
    { key: "7", value: 7, text: "7명 이하" },
    { key: "6", value: 6, text: "6명 이하" },
    { key: "5", value: 5, text: "5명 이하" },
  ];
  const publicOptions = [
    { key: "0", value: 0, text: "전체" },
    { key: "1", value: 1, text: "공개방" },
    { key: "2", value: 2, text: "비공개방" },
  ];

  const getGameList = (maxPlayer, isPublic) => {
    axios
      .get("/mafiace/api/game", {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        params: { maxPlayer, isPublic },
      })
      .then(({ data }) => {
        setList(data.list);
        setTotalRoom(data.list.length);
        setLoading(false);

        console.log("방 불러옴");
        console.log(`max: ${maxPlayer}, public: ${isPublic}`);

        if (data.list.length !== 0) initPageNav(0);
      })
      .catch(({ response }) => {
        localStorage.removeItem("jwt");
        window.location.reload();
        alert("요청 권한이 없습니다");
      });
  };

  useEffect(() => {
    getGameList(maxPlayer, isPublic);
    setPage(0);
  }, [maxPlayer, isPublic, totalRoom]);

  const counter = useRef();
  const pr = useRef();
  const pl = useRef();

  const initPageNav = (offset) => {
    setPage((prev) => {
      let next = Math.min(Math.max(page + offset, 0), totalRoom - 1);

      if (next > Math.ceil(totalRoom / 6) - 1) next = prev;

      counter.current.innerHTML = ` ${next + 1} / ${Math.ceil(totalRoom / 6)}`;

      pl.current.setAttribute("data-state", next === 0 ? "disabled" : "");
      pr.current.setAttribute(
        "data-state",
        next === Math.ceil(totalRoom / 6) - 1 ? "disabled" : ""
      );

      return next;
    });
  };

  return (
    <>
      {loading ? (
        <Loader msg="로딩 중..." />
      ) : (
        // 로딩 완료
        <div>
          {/* 방 하나도 없을 때 */}
          {totalRoom === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 방 목록들 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  minHeight: "53vh",
                  justifyContent: "center",
                }}
              >
                <div
                  className={styles["img-wrap"]}
                  style={{ textAlign: "center" }}
                >
                  <img
                    src={"./img/main.png"}
                    style={{
                      height: "20em",
                      marginTop: "17%",
                    }}
                    alt=""
                  />

                  <div
                    style={{
                      color: "#8157a8",
                      fontSize: "5em",
                      marginTop: "2%",
                    }}
                  >
                    진행중인 게임이 없어요.
                  </div>
                </div>
              </div>

              {/* 하단 컨트롤러 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginTop: "2%",
                  height: "100px",
                  width: "100%",
                }}
              >
                {/* 방 필터 */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "24%",
                    height: "50%",
                    margin: "auto 0",
                    marginLeft: "5%",
                    marginTop: "3.5%",
                  }}
                >
                  <div style={{ width: "100px", margin: "auto 0" }}>
                    <Dropdown
                      selection
                      fluid
                      className={styles["select-box"]}
                      options={publicOptions}
                      defaultValue={0}
                      upward
                      onChange={(e, { value }) => {
                        setIsPublic(value);
                      }}
                    />
                  </div>

                  <div style={{ width: "100px", margin: "auto  0" }}>
                    <Dropdown
                      selection
                      fluid
                      className={styles["select-box"]}
                      options={maxPlayerOptions}
                      defaultValue={8}
                      upward
                      onChange={(e, { value }) => {
                        setMaxPlayer(value);
                      }}
                    />
                  </div>
                </div>

                {/* 페이징 네비바 */}
                <div
                  style={{
                    width: "150px",
                    visibility: "hidden",
                  }}
                ></div>

                {/* 방 만들기 */}
                <RoomMakeBtn
                  setGameInfo={setGameInfo}
                  setToken={setToken}
                  ingame={ingame}
                  setIngame={setIngame}
                ></RoomMakeBtn>
              </div>
            </div>
          ) : (
            // 방 하나라도 있을 때
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 방 목록들 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  minHeight: "53vh",
                }}
              >
                {list.slice(page * 6, page * 6 + 6).map((item) => (
                  <RoomComp
                    key={item.game.id}
                    game={item.game}
                    participantCount={item.participantCount}
                    setIngame={setIngame}
                    setToken={setToken}
                    ingame={ingame}
                    setGameInfo={setGameInfo}
                  />
                ))}
              </div>

              {/* 하단 컨트롤러 */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  marginTop: "2%",
                  height: "100px",
                  width: "100%",
                }}
              >
                {/* 방 필터 */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "24%",
                    height: "50%",
                    margin: "auto 0",
                    marginLeft: "5%",
                    marginTop: "3.5%",
                  }}
                >
                  <div style={{ width: "100px", margin: "auto 0" }}>
                    <Dropdown
                      selection
                      fluid
                      className={styles["select-box"]}
                      options={publicOptions}
                      defaultValue={0}
                      upward
                      onChange={(e, { value }) => {
                        setIsPublic(value);
                      }}
                    />
                  </div>

                  <div style={{ width: "100px", margin: "auto  0" }}>
                    <Dropdown
                      selection
                      fluid
                      className={styles["select-box"]}
                      options={maxPlayerOptions}
                      defaultValue={8}
                      upward
                      onChange={(e, { value }) => {
                        setMaxPlayer(value);
                      }}
                    />
                  </div>
                </div>

                {/* 페이징 네비바 */}
                <div
                  style={{
                    width: "150px",
                  }}
                >
                  <div>
                    {" "}
                    <button
                      className={"paginate left pageBtn"}
                      ref={pl}
                      onClick={initPageNav.bind(this, -1)}
                    >
                      <i></i>
                      <i></i>
                    </button>
                    <div className={"counter"} ref={counter}></div>
                    <button
                      className={"paginate right pageBtn"}
                      ref={pr}
                      onClick={initPageNav.bind(this, 1)}
                    >
                      <i></i>
                      <i></i>
                    </button>
                  </div>
                </div>

                {/* 방 만들기 */}
                <RoomMakeBtn
                  setGameInfo={setGameInfo}
                  setToken={setToken}
                  ingame={ingame}
                  setIngame={setIngame}
                ></RoomMakeBtn>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomList;
