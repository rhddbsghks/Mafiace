import RoomList from "../../components/main/room/RoomList";

const Room = ({ getIngame }) => {
  return (
    <>
      <h1>Room__Page</h1>
      <RoomList getIngame={getIngame} />
    </>
  );
};

export default Room;
