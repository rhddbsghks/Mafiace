import { useState } from "react";
import Main from "./pages/main/Main";
import Ingame from "./pages/ingame/Ingame";

import { Container } from "semantic-ui-react";
function App() {
  const [ingame, setIngame] = useState(false);

  const getIngame = (bool) => {
    setIngame(bool);
  };

  return (
    <>
      <Container>
        {!ingame ? (
          <Main getIngame={getIngame} />
        ) : (
          <Ingame getIngame={getIngame} />
        )}
      </Container>
    </>
  );
}

export default App;
