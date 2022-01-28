import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Room from "./Room";
import Notice from "./Notice";
import Rules from "./Rules";
import Mypage from "./Mypage";
import Ranking from "./Ranking";

const Main = ({ ingame, getIngame }) => {
  const [login, setLogin] = useState(false);

  const onClickIg = () => {
    getIngame(!ingame);
  };

  const getLogin = (login) => {
    setLogin(login);
  };

  return (
    <>
      {!login ? (
        <Login login={login} getLogin={getLogin} />
      ) : (
        <>
          <Router>
            <Header login={login} getLogin={getLogin} />
            <Routes>
              <Route path="/" element={<Room onClickIg={onClickIg} />} />
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
