import RoomList from "../../components/main/room/RoomList";

const Room = ({ onClickIg }) => {
  return (
    <>
      <h1>Room__Page</h1>
      <RoomList onClickIg={onClickIg} />
    </>
  );
};

export default Room;
