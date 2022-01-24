import RoomList from "../pages/RoomList";
import { Link } from "react-router-dom";

const Main = ({ login, getLogin, ingame, getIngame }) => {
  const onClick = () => {
    getLogin(!login);
    getIngame(!ingame);
  };

  return (
    <>
      <h1>Main__Page</h1>
      {/* props */}
      <RoomList />
      {/* ${roomNum} */}
      <Link to={"/waiting"}>
        <button onClick={onClick}>방 입장</button>
      </Link>
    </>
  );
};

export default Main;
