import { useState } from "react";
import Player from "./components/Player";
import Board from "./components/Board";
import Results from "./components/ResultsMessage";
import ResultsBoard from "./components/ResultsBoard";
import { BoardContextProvider } from "./contexts/BoardContext";
import { CELLS, VICTORY_PATTERNS } from "./utils/constants";

import "./Globals.css";

function App() {
  const [winner, setWinner] = useState(undefined);
  const [cells, setCells] = useState(new Map());
  const [xLastPlayed, setXlastPlayed] = useState(undefined);
  const [activePlayer, setActivePlayer] = useState(0);
  const [selectedCell, setSelectedCell] = useState(undefined);
  const [players, setPlayers] = useState(["", ""]);

  function checkWin(potentialWinner, cells) {
    for (const pattern of VICTORY_PATTERNS) {
      let winner = true;
      for (const point of pattern) {
        if (cells.get(point) !== potentialWinner) {
          winner = false;
          break;
        }
      }

      if (winner) {
        setWinner(winner && potentialWinner);
        break;
      }
    }
  }

  function openModal(number) {
    if (typeof selectedCell === "number") {
      return;
    }
    setSelectedCell(number);
  }

  function handleSelection(value, number) {
    setCells((prev) => {
      const updatedMap = new Map(Array.from(prev));
      updatedMap.set(number, value);
      checkWin(value, updatedMap);
      return updatedMap;
    });
    setXlastPlayed(value === "X");
    setSelectedCell(undefined);
    setActivePlayer((current) => (current === 0 ? 1 : 0));
  }

  function handleCellClick(number) {
    if (cells.size === 0) {
      openModal(number);
    } else {
      handleSelection(xLastPlayed ? "O" : "X", number);
    }
  }

  function handleNewGame() {
    setCells(new Map());
    setWinner(undefined);
    setSelectedCell(undefined);
    setActivePlayer(0);
  }

  function handleReset() {
    handleNewGame();
    setPlayers(["", ""]);
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
