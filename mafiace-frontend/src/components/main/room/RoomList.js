const RoomList = ({ onClickIg }) => {
  const onClick = () => {
    onClickIg();
  };
  return (
    <>
      <h1>RoomList__Compo</h1>

      <button onClick={onClick}>방 입장</button>
    </>
  );
};

export default RoomList;
