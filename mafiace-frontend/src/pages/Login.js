import { useState } from "react";
import FindId from "./FindId";
import FindPw from "./FindPw";
import Signup from "./Signup";

const Login = ({ login, getLogin }) => {
  const [id, setId] = useState(false); // ID 찾기
  const [pw, setPw] = useState(false); // PW 찾기
  const [up, setUp] = useState(false); // 회원가입

  const onClick = () => {
    getLogin(!login);
  };

  const clickFindId = () => {
    setId(true);
  };

  const clickFindPw = () => {
    setPw(true);
  };

  const clickSignup = () => {
    setUp(true);
  };

  return (
    <>
      <h1>Login__Page</h1>
      <button onClick={onClick}>Login</button>
      <button onClick={clickFindId}>Find ID</button>
      <button onClick={clickFindPw}>Find PW</button>
      <button onClick={clickSignup}>회원가입</button>
      {id ? <FindId /> : null}
      {pw ? <FindPw /> : null}
      {up ? <Signup /> : null}
    </>
  );
};

export default Login;
