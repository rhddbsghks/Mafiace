import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderCompo = ({ getLogin }) => {
  const [value, setValue] = useState(2);
  let navigate = useNavigate();

  const clickLogout = () => {
    localStorage.clear();
    getLogin(false);
    navigate("/");
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/notice");
        break;
      case 1:
        navigate("/rules");
        break;
      case 2:
        navigate("/");
        break;
      case 3:
        navigate("/mypage");
        break;
      case 4:
        navigate("/ranking");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h1>Header</h1>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="공지사항" />
        <Tab label="게임방법" />
        <Tab label="방 목록" />
        <Tab label="내 정보" />
        <Tab label="명예의 전당" />
        {/* <button onClick={clickLogout}>로그아웃</button> */}
      </Tabs>
      <Button variant="outlined" onClick={clickLogout}>
        로그아웃
      </Button>
    </>
  );
};

export default HeaderCompo;
