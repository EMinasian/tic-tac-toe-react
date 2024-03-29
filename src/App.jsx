import { useState } from "react";
import Player from "./components/Player";
import Board from "./components/Board";
import Results from "./components/ResultsMessage";
import ResultsBoard from "./components/ResultsBoard";
import { BoardContextProvider } from "./contexts/BoardContext";
import { CELLS } from "./utils/constants";
import checkWin from "./utils/checkWin";

import "./Globals.css";

let winner;

function App() {
  const [cells, setCells] = useState(new Map());
  const [selectedCell, setSelectedCell] = useState(undefined);
  const [players, setPlayers] = useState([
    { name: "", symbol: "" },
    { name: "", symbol: "" },
  ]);

  const activePlayer = cells.size % 2 === 0 ? 0 : 1;

  function openModal(number) {
    if (typeof selectedCell === "number") {
      return;
    }
    setSelectedCell(number);
  }

  function handleSelection(value, number) {
    if (!players[activePlayer]?.symbol) {
      setPlayers((prev) => {
        const updatedPlayers = [...prev];
        updatedPlayers[activePlayer].symbol = value;
        updatedPlayers[Number(activePlayer === 0)].symbol =
          value === "X" ? "O" : "X";
        return updatedPlayers;
      });
      players[activePlayer].symbol = value;
    }
    setCells((prev) => {
      const updatedMap = new Map(Array.from(prev));
      updatedMap.set(number, value);
      winner = checkWin(value, updatedMap);
      return updatedMap;
    });
    setSelectedCell(undefined);
  }

  function handleCellClick(number) {
    if (winner) {
      return;
    } else if (!players[activePlayer]?.symbol) {
      openModal(number);
    } else {
      handleSelection(players[activePlayer]?.symbol, number);
    }
  }

  function handleNewGame() {
    winner = undefined;
    setCells(new Map());
    setSelectedCell(undefined);
  }

  function handleReset() {
    handleNewGame();
    setPlayers([
      { name: "", symbol: "" },
      { name: "", symbol: "" },
    ]);
  }

  return (
    <div id="game-section">
      <div>
        <ul id="players-section">
          {players.map((player, playerKey) => (
            <Player
              player={player}
              setPlayers={setPlayers}
              playerKey={playerKey}
              activePlayer={activePlayer}
              key={playerKey}
            />
          ))}
        </ul>
        {(winner || cells.size === CELLS.length) && <Results winner={winner} />}
        <BoardContextProvider
          value={{
            handleCellClick,
            handleSelection,
            cells,
            setSelectedCell,
            selectedCell,
          }}
        >
          <Board />
        </BoardContextProvider>
        <button onClick={() => handleNewGame()}>
          {winner ? "Play again" : "Start again"}
        </button>
        <button onClick={() => handleReset()}>Reset</button>
      </div>
      {/* <ResultsBoard /> */}
    </div>
  );
}

export default App;
