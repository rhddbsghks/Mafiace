import React from "react";

import LoginForm from "../../components/main/login/LoginForm";
// import Logo from "../../components/main/login/Logo";
import NewLogo from "../../components/main/login/NewLogo";
import Gallery from "../../components/main/login/Gallery";

const Login = ({ getLogin }) => {
  return (
    <>
      <Gallery></Gallery>
      <div
        style={{
          position: "absolute",
          right: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          // height: "20%",
          width: "35%",
        }}
      >
        <NewLogo></NewLogo>
        <LoginForm getLogin={getLogin} />
      </div>

      {/* <Logo /> */}
    </>
  );
};

export default Login;
