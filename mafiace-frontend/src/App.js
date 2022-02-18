import { useState } from "react";
import Main from "./pages/main/Main";
import Ingame from "./pages/ingame/Ingame";
import "./style.css";

import { Container } from "semantic-ui-react";
function App() {
  const [ingame, setIngame] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  const [token, setToken] = useState("");

  return (
    <>
      {!ingame ? (
        <Container>
          <Main
            setIngame={setIngame}
            ingame={ingame}
            setGameInfo={setGameInfo}
            setToken={setToken}
          />
        </Container>
      ) : (
        <Ingame
          setIngame={setIngame}
          ingame={ingame}
          gameInfo={gameInfo}
          setGameInfo={setGameInfo}
          token={token}
        />
      )}
    </>
  );
}

export default App;
