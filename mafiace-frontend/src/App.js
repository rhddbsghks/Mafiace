import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Header from "./components/Header";
import HeaderIngame from "./components/HeaderIngame";
import Notice from "./routes/Notice";
import Rules from "./routes/Rules";
import Mypage from "./routes/Mypage";
import Ranking from "./routes/Ranking";
import Waiting from "./components/Waiting";
import Start from "./components/Start";
import Result from "./routes/Result";
import Login from "./pages/Login";

function App() {
  const [login, setLogin] = useState(false);
  const [ingame, setIngame] = useState(false);

  const getLogin = (login) => {
    setLogin(login);
  };

  const getIngame = (ingame) => {
    setIngame(ingame);
  };

  return (
    <>
      {login || ingame ? (
        <>
          <Router>
            {login ? <Header login={login} getLogin={getLogin} /> : null}
            {ingame ? <HeaderIngame /> : null}

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    login={login}
                    getLogin={getLogin}
                    ingame={ingame}
                    getIngame={getIngame}
                  />
                }
              />

              <Route path="/notice" element={<Notice />} />

              <Route path="/rules" element={<Rules />} />

              <Route path="/mypage/:id" element={<Mypage />} />
              <Route path="/mypage" element={<Mypage />} />

              <Route path="/ranking" element={<Ranking />} />

              <Route
                path="/waiting/:roomNum"
                element={
                  <Waiting
                    login={login}
                    getLogin={getLogin}
                    ingame={ingame}
                    getIngame={getIngame}
                  />
                }
              />
              <Route
                path="/waiting"
                element={
                  <Waiting
                    login={login}
                    getLogin={getLogin}
                    ingame={ingame}
                    getIngame={getIngame}
                  />
                }
              />

              <Route path="/start/:roomNum" element={<Start />} />
              <Route path="/start" element={<Start />} />

              <Route path="/result/:roomNum" element={<Result />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Login login={login} getLogin={getLogin} />
      )}
    </>
  );
}

export default App;
