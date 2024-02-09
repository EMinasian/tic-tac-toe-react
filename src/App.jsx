import Player from "./components/Player";
import Board from "./components/Board";

import './Globals.css'

function App() {
  return (
    <>
      <div id="players-section">
        <Player />
        <Player />
      </div>
      <Board />
    </>
  );
}

export default App;
