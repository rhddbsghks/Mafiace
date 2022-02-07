import RoomList from "../../components/main/room/RoomList";

const Room = ({ setIngame, setToken, ingame, setGameInfo }) => {
  return (
    <>
      <RoomList
        setIngame={setIngame}
        setToken={setToken}
        ingame={ingame}
        setGameInfo={setGameInfo}
      />
    </>
  );
};

export default Room;
