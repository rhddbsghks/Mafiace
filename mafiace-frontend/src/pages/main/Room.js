import RoomList from "../../components/main/room/RoomList";

const Room = ({ onClickIg }) => {
  const onClick = () => {
    onClickIg();
  };
  return (
    <>
      <h1>Room__Page</h1>
      <RoomList />

      <button onClick={onClick}>방 입장</button>
    </>
  );
};

export default Room;
