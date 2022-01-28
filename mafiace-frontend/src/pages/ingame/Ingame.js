import HeaderIngame from "./HeaderIngame";
import Ready from "../../components/ingame/ingame/Ready";
import Waiting from "../../components/ingame/ingame/Waiting";
import Play from "../../components/ingame/ingame/Play";
import Result from "../../components/ingame/ingame/Result";

const Ingame = ({ ingame, getIngame }) => {
  const onClickIg = () => {
    getIngame(!ingame);
  };
  return (
    <>
      <HeaderIngame />
      <Ready />
      <Waiting onClickIg={onClickIg} />
      <Play />
      <Result />
    </>
  );
};

export default Ingame;
