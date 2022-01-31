const RoomList = ({ getIngame }) => {
  const clickIngame = () => {
    getIngame(true);
  };
  return (
    <>
      <h1>RoomList__Compo</h1>

      <button onClick={clickIngame}>방 입장</button>
    </>
  );
};

export default RoomList;
