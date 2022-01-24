import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Header</h1>
      <div>
        <Link to={"/notice"}>공지사항</Link>
        <Link to={"/rules"}>게임방법</Link>
        <Link to={"/"}>메인_방 목록</Link>
        {/* ${id} */}
        <Link to={"/mypage"}>내 정보</Link>
        <Link to={"/ranking"}>명예의 전당</Link>
      </div>
    </>
  );
};

export default Header;
