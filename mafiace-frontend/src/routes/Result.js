import { Link } from "react-router-dom";

const Result = () => {
  return (
    <>
      <h1>Result__Page</h1>
      <Link to="/waiting">
        <button>대기실 이동</button>
      </Link>
    </>
  );
};

export default Result;
