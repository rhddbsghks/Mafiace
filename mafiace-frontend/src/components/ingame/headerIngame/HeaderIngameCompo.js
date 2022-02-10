import React, { useEffect, useState } from "react";

const HeaderIngameCompo = ({ gameInfo, start }) => {
  const [time, setTime] = useState(10);
  const [timer, setTimer] = useState();

  useEffect(() => {
    if (start) {
      setTimer(
        setInterval(() => {
          setTime((prev) => prev - 1);
        }, 1000)
      );
    }
  }, [start]);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(timer);
    }
  }, [time]);

  return (
    <>
      <h1 style={{ margin: 0, zIndex: "0" }}>HeaderIngame__Compo</h1>
      <h2>{time}</h2>
    </>
  );
};

export default HeaderIngameCompo;
