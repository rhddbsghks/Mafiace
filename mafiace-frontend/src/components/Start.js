import Play from "../pages/Play";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <h1>Start__Page</h1>
      {/* props */}
      <Play />
      <Link to="/result">
        <button>결과 보기</button>
      </Link>
    </>
  );
};

export default Start;
