import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Room from "./Room";
import Notice from "./Notice";
import Rules from "./Rules";
import Mypage from "./Mypage";
import Ranking from "./Ranking";
import NotFound from "../../components/common/NotFound";

const Main = ({ setIngame, ingame, setGameInfo, setToken }) => {
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
      <Router>
        {!login ? (
          <Routes>
            <Route path="/" element={<Login getLogin={getLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <>
            <Header getLogin={getLogin} />
            <div
              style={{ marginTop: "5.5%", height: "75%", marginBottom: "0" }}
              className="scrollbar"
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <Room
                      setIngame={setIngame}
                      setGameInfo={setGameInfo}
                      setToken={setToken}
                      ingame={ingame}
                    />
                  }
                />
                <Route path="/notice" element={<Notice />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </>
  );
};

export default Main;
