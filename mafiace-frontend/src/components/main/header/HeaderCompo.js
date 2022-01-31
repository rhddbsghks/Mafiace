import { Link } from "react-router-dom";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";

const HeaderCompo = ({ getLogin }) => {
  const clickLogout = () => {
    localStorage.clear();
    getLogin(false);
  };

  return (
    <>
      <h1>Header</h1>
      {/* <Tabs centered>
        <Link to={"/notice"}>
          <Tab label="공지사항" />
        </Link>
        <Link to={"/rules"}>
          <Tab label="게임방법" />
        </Link>
        <Link to={"/"}>
          <Tab label="방 목록" />
        </Link>

        <Link to={"/mypage"}>
          <Tab label="내 정보" />
        </Link>
        <Link to={"/ranking"}>
          <Tab label="명예의 전당" />
        </Link>
      </Tabs> */}
      <Link to={"/"}>
        <button onClick={clickLogout}>로그아웃</button>
      </Link>

      <div>
        <Link to={"/notice"}>_공지사항_</Link>
        <Link to={"/rules"}>_게임방법_</Link>
        <Link to={"/"}>_방 목록_</Link>
        <Link to={"/mypage"}>_내 정보_</Link>
        <Link to={"/ranking"}>_명예의 전당_</Link>
      </div>
    </>
  );
};

export default HeaderCompo;
