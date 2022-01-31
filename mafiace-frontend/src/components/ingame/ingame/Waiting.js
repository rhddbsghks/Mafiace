const Waiting = ({ onClickIg }) => {
  const onClick = () => {
    onClickIg();
  };
  return (
    <>
      <h1>Waiting__Compo</h1>

      <button onClick={onClick}>메인 화면으로 나가기</button>
    </>
  );
};

export default Waiting;
