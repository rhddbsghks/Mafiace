import React from "react";

import LoginForm from "../../components/main/login/LoginForm";
import Logo from "../../components/main/login/Logo";

const Login = ({ getLogin }) => {
  return (
    <>
      <Logo />
      <LoginForm getLogin={getLogin} />
    </>
  );
};

export default Login;
