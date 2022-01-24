import Ready from "../pages/Ready";
import { Link } from "react-router-dom";

const Waiting = ({ login, getLogin, ingame, getIngame }) => {
  const onClick = () => {
    getLogin(!login);
    getIngame(!ingame);
  };

  return (
    <>
      <h1>Waiting__Page</h1>
      {/* props */}
      <Ready />
      <Link to="/">
        <button onClick={onClick}>메인 화면으로 나가기</button>
      </Link>
      <Link to="/start">
        <button>게임 시작</button>
      </Link>
    </>
  );
};

export default Waiting;
