import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomComp from "./RoomComp";
import * as config from "../../../config";

const RoomList = ({ getIngame }) => {
  const clickIngame = () => {
    getIngame(true);
  };

  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get({config.API_URL}+"/asd", {
      params: { nickname: values.nickname },
    })
  }, []);

  return (
    <>
      <button onClick={clickIngame}>방 입장</button>
    </>
  );
};

export default RoomList;
