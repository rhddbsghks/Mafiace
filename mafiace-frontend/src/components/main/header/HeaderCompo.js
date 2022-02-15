import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { Tab } from "semantic-ui-react";
// import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCompo = ({ getLogin }) => {
  const menu = ["/notice", "/rules", "/", "/mypage", "/ranking"];
  const newV = useRef(window.location.pathname).current;
  const [value, setValue] = useState(menu.indexOf(newV));

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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "1%",
          margin: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1%",
            left: "10%",
          }}
        >
          <img src="img/Logo.png" alt="" width="40%" />
          <div>
            <span style={{ fontSize: "1.8em" }} className="gray">
              Ma
            </span>
            <span style={{ fontSize: "1.8em" }} className="color">
              f
            </span>
            <span style={{ fontSize: "1.8em" }} className="gray">
              i
            </span>
            <span style={{ fontSize: "1.8em" }} className="color">
              ace
            </span>
          </div>
        </div>
        <div></div>
        <span
          style={{
            margin: "auto 0",
            fontWeight: "900",
            fontSize: "1.5em",
            color: "gray",
          }}
          onClick={clickLogout}
          id="logout"
        >
          로그아웃
        </span>
      </div>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="공지사항" />
        <Tab label="게임방법" />
        <Tab label="방 목록" />
        <Tab label="내 정보" />
        <Tab label="명예의 전당" />
      </Tabs>
    </>
  );
};

export default HeaderCompo;
