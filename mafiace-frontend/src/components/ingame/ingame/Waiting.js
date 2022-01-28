const Waiting = ({ onClickIg }) => {
  const onClick = () => {
    onClickIg();
  };
  return (
    <>
      <h1>Waiting__Page</h1>

      <button onClick={onClick}>메인 화면으로 나가기</button>
    </>
  );
};

export default Waiting;
