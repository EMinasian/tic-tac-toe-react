import { useState } from "react";
import Player from "./components/Player";
import Board from "./components/Board";
import Results from "./components/ResultsMessage";
import ResultsBoard from "./components/ResultsBoard";
import { BoardContextProvider } from "./contexts/BoardContext";
import { CELLS, VICTORY_PATTERNS } from "./utils/constants";

import "./Globals.css";

let winner;

function App() {
  const [cells, setCells] = useState(new Map());
  const [activePlayer, setActivePlayer] = useState(0);
  const [selectedCell, setSelectedCell] = useState(undefined);
  const [players, setPlayers] = useState([
    { name: "", symbol: "" },
    { name: "", symbol: "" },
  ]);

  function checkWin(potentialWinner, cells) {
    for (const pattern of VICTORY_PATTERNS) {
      let hasWinner = true;
      for (const point of pattern) {
        if (cells.get(point) !== potentialWinner) {
          hasWinner = false;
          break;
        }
      }

      if (hasWinner) {
        // setCells rerenders, so no need for a separate statae variable
        winner = potentialWinner;
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
      checkWin(value, updatedMap);
      return updatedMap;
    });
    setSelectedCell(undefined);
    setActivePlayer((current) => (current === 0 ? 1 : 0));
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
    setActivePlayer(0);
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
