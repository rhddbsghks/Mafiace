import RoomList from "../../components/main/room/RoomList";

const Room = ({ setIngame, setGameId, ingame }) => {
  return (
    <>
      <RoomList setIngame={setIngame} setGameId={setGameId} ingame={ingame} />
    </>
  );
};

export default Room;
