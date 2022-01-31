import React from "react";

import LoginForm from "../../components/main/login/LoginForm";
import Logo from "../../components/main/login/Logo";

import { Container } from "semantic-ui-react";

const Login = ({ getLogin }) => {
  return (
    <>
      <Container>
        <Logo />
        <LoginForm getLogin={getLogin} />
      </Container>
    </>
  );
};

export default Login;
