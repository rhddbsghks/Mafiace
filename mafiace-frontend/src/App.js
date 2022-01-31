import { useState } from "react";
import Main from "./pages/main/Main";
import Ingame from "./pages/ingame/Ingame";

function App() {
  const [ingame, setIngame] = useState(false);

  const getIngame = (bool) => {
    setIngame(bool);
  };

  return (
    <>
      {!ingame ? (
        <Main getIngame={getIngame} />
      ) : (
        <Ingame getIngame={getIngame} />
      )}
    </>
  );
}

export default App;
