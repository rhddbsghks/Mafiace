const Waiting = ({ setIngame }) => {
  const clickMain = () => {
    setIngame(false);
  };
  return (
    <>
      <h1>Waiting__Compo</h1>

      <button onClick={clickMain}>메인 화면으로 나가기</button>
    </>
  );
};

export default Waiting;
