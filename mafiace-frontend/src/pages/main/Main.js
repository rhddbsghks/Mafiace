import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Room from "./Room";
import Notice from "./Notice";
import Rules from "./Rules";
import Mypage from "./Mypage";
import Ranking from "./Ranking";

const Main = ({ getIngame }) => {
  const [login, setLogin] = useState(false);

  const getLogin = (bool) => {
    setLogin(bool);
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }, []);

  return (
    <>
      {!login ? (
        <Login getLogin={getLogin} />
      ) : (
        <>
          <Router>
            <Header getLogin={getLogin} />
            <Routes>
              <Route path="/" element={<Room getIngame={getIngame} />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/ranking" element={<Ranking />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
};

export default Main;
