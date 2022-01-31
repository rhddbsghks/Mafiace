import React from "react";

import LoginForm from "../../components/main/login/LoginForm";
import Logo from "../../components/main/login/Logo";

import { Container } from "semantic-ui-react";

const Login = ({ login, getLogin }) => {
  return (
    <>
      <Container>
        <Logo />
        <LoginForm login={login} getLogin={getLogin} />
      </Container>
    </>
  );
};

export default Login;
