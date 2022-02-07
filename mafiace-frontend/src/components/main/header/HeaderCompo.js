import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCompo = ({ getLogin }) => {
  const menu = ["/notice", "/rules", "/", "/mypage", "/ranking", "/chat"];
  const [value, setValue] = useState();

  let navigate = useNavigate();

  const clickLogout = () => {
    localStorage.clear();
    getLogin(false);
    navigate("/");
  };

  const switchChange = (idx) => {
    navigate(menu[idx]);
  };

  const handleChange = (e, idx) => {
    setValue(idx);
    switchChange(idx);
  };

  useEffect(() => {
    let newV = window.location.pathname;
    navigate(newV);
    setValue(menu.indexOf(newV));
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "90%",
          height: "3.7em",
          margin: "auto",
          paddingTop: "2%",
        }}
      >
        <h1>Logo</h1>
        <Button variant="outlined" onClick={clickLogout}>
          로그아웃
        </Button>
      </div>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="공지사항" />
        <Tab label="게임방법" />
        <Tab label="방 목록" />
        <Tab label="내 정보" />
        <Tab label="명예의 전당" />
        <Tab label="채팅방" />
      </Tabs>
    </>
  );
};

export default HeaderCompo;
