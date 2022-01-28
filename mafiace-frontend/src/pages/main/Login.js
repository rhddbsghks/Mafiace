import React, { useState, useEffect } from "react";

import LoginForm from "../../components/main/login/LoginForm";

import { useTrail, a } from "@react-spring/web";
import { Container } from "semantic-ui-react";

import styles from "./styles.module.css";

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 800 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className={styles.trailsText} style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const Login = ({ login, getLogin }) => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  useEffect(() => {
    let Timer1 = setTimeout(() => {
      setOpen1(false);
    }, 1500);
    let Timer2 = setTimeout(() => {
      setOpen2(true);
    }, 1500);
    let Timer3 = setTimeout(() => {
      setOpen2(false);
    }, 3000);
    let Timer4 = setTimeout(() => {
      setOpen3(true);
    }, 4000);
    return () => {
      clearTimeout(Timer1);
      clearTimeout(Timer2);
      clearTimeout(Timer3);
      clearTimeout(Timer4);
    };
  }, []);

  return (
    <>
      <Container>
        {!open3 ? (
          <div className={styles.container}>
            <Trail open={open1}>
              <span></span>
              <span>Mafia</span>
              <span></span>
            </Trail>
            <Trail open={open2}>
              <span></span>
              <span>Face</span>
              <span></span>
            </Trail>
          </div>
        ) : (
          <div className={styles.container}>
            <Trail open={open3}>
              <span></span>
              <span>MaFiace</span>
              <span></span>
            </Trail>
          </div>
        )}
        <LoginForm login={login} getLogin={getLogin} />
      </Container>
    </>
  );
};

export default Login;