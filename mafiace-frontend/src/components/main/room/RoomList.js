import axios from "axios";
import React, { useEffect, useState } from "react";
// import RoomComp from "./RoomComp";
import * as config from "../../../config";
import styles from "./room.module.css";
import Loader from "./Loader";
import RoomComp from "./RoomComp";

const RoomList = ({ getIngame }) => {
  const clickIngame = () => {
    getIngame(true);
  };

  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPlayer, setMaxPlayer] = useState(8);
  const [isPublic, setIsPublic] = useState(0);
  const [totalRoom, setTotalRoom] = useState();

  const getGameList = (maxPlayer, isPublic, page) => {
    axios
      .get(config.API_URL + "/game", {
        params: { maxPlayer, isPublic, page },
      })
      .then(({ data }) => {
        setList(data.list);
        setTotalRoom(data.list.length);
        setLoading(false);
      });
  };

  useEffect(() => {
    getGameList(maxPlayer, isPublic, page);
    // getGameList(maxPlayer, isPublic, page);
  }, []);

  return (
    <>
      {/* <Loader /> 로더 확인해보기*/}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {list.length === 0 ? (
            <div
              style={{
                height: "55vh",
                textAlign: "center",
              }}
            >
              <div className={styles["img-wrap"]}>
                <img
                  src={"./img/main.png"}
                  style={{ height: "20em", marginTop: "9%" }}
                  alt=""
                />

                <div
                  style={{ color: "#8157a8", fontSize: "5em", marginTop: "3%" }}
                >
                  진행중인 게임이 없어요.
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                height: "55vh",
              }}
            >
              {list.map((item) => (
                <RoomComp key={item.id} game={item} />
              ))}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginTop: "5%",
                  width: "100%",
                }}
              >
                <button
                  className={`${styles.button} ${styles["btn-2"]}`}
                  onClick={clickIngame}
                >
                  방 만들기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomList;
