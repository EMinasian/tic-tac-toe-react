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
  const [activePlayer, setActivePlayer] = useState(0);
  const [selectedCell, setSelectedCell] = useState(undefined);
  const [players, setPlayers] = useState([
    { name: "", symbol: "" },
    { name: "", symbol: "" },
  ]);

  function checkWin(potentialWinner, cells, cell) {
    cells.set(cell, potentialWinner);
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
      return updatedMap;
    });
    checkWin(value, cells, number);
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
    setCells(new Map());
    setWinner(undefined);
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
