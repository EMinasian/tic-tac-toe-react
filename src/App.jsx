import { useState } from "react";
import Player from "./components/Player";
import Board from "./components/Board";
import { BoardContextProvider } from "./contexts/BoardContext";
import { CELLS, VICTORY_PATTERNS } from "./utils/constants";

import "./Globals.css";

function App() {
  const [winner, setWinner] = useState(undefined);
  const [xCells, setXCells] = useState([]);
  const [oCells, setOCells] = useState([]);
  const [xLastPlayed, setXlastPlayed] = useState(undefined);
  const [isOneSelected, setIsOneSelected] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);

  

  function checkWin(potentialWinner, correspondingCells) {
    for (const pattern of VICTORY_PATTERNS) {
      let winner = true;
      for (const point of pattern) {
        if (!correspondingCells.includes(point)) {
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
    if (isOneSelected) {
      return;
    }
    setSelectedCell(number);
    setIsOneSelected(true);
  }

  function handleSelection(value, number) {
    const nextCells = [...(value === "X" ? xCells : oCells), number];
    if (value === "X") {
      setXCells(nextCells);
    } else {
      setOCells(nextCells);
    }
    checkWin(value, nextCells);
    setXlastPlayed(value === "X");
    setIsOneSelected(false);
  }

  function handleCellClick(number) {
    if (xCells.length === 0 && oCells.length === 0) {
      openModal(number);
    } else {
      handleSelection(xLastPlayed ? "O" : "X", number);
    }
  }

  function handleReset() {
    setXCells([]);
    setOCells([]);
    setWinner(undefined);
    setIsOneSelected(false);
    setSelectedCell(0);
  }

  return (
    <>
      <div id="players-section">
        <Player />
        <Player />
        {winner ||
          (xCells.length + oCells.length === CELLS.length && (
            <Results winner={winner} />
          ))}
      </div>
      <BoardContextProvider value={{handleCellClick, handleSelection, xCells, oCells, setIsOneSelected, isOneSelected, selectedCell}}>
        <Board />
      </BoardContextProvider>
      <button onClick={() => handleReset()}>
        {winner ? "Play again" : "Reset"}
      </button>
    </>
  );
}

export default App;
