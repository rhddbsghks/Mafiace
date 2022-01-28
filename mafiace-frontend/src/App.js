import { useState } from "react";
import Main from "./pages/main/Main";
import Ingame from "./pages/ingame/Ingame";

function App() {
  const [ingame, setIngame] = useState(false);

  const getIngame = (ig) => {
    setIngame(ig);
  };

  return (
    <>
      {!ingame ? (
        <Main ingame={ingame} getIngame={getIngame} />
      ) : (
        <Ingame ingame={ingame} getIngame={getIngame} />
      )}
    </>
  );
}

export default App;
