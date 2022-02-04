import { useState } from "react";
import Main from "./pages/main/Main";
import Ingame from "./pages/ingame/Ingame";
import "./style.css";

import { Container } from "semantic-ui-react";
function App() {
  const [ingame, setIngame] = useState(false);
  const [gameId, setGameId] = useState("");

  return (
    <>
      <Container>
        {!ingame ? (
          <Main setIngame={setIngame} setGameId={setGameId} ingame={ingame} />
        ) : (
          <Ingame setIngame={setIngame} ingame={ingame} gameId={gameId} />
        )}
      </Container>
    </>
  );
}

export default App;
