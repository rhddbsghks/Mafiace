import RoomList from "../../components/main/room/RoomList";

const Room = ({ getIngame }) => {
  return (
    <>
      <RoomList getIngame={getIngame} />
    </>
  );
};

export default Room;
