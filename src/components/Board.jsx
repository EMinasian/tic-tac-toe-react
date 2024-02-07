import { useState } from "react";
import Results from "./Results";
import Cell from "./Cell";
import { VICTORY_PATTERNS } from "../utils/victoryPatterns";

const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

import "../Globals.css";

export default function Board() {
  const [isOneSelected, setIsOneSelected] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  const [winner, setWinner] = useState(undefined);
  const [xCells, setXCells] = useState([]);
  const [oCells, setOCells] = useState([]);
  const [xLastPlayed, setXlastPlayed] = useState(undefined);

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

  function handleReset() {
    setXCells([]);
    setOCells([]);
    setWinner(undefined);
    setIsOneSelected(false);
    setSelectedCell(0);
  }

  function openModal(number) {
    console.log("in modal", isOneSelected, number);
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
    console.log(number);
    if (xCells.length === 0 && oCells.length === 0) {
      openModal(number);
    } else {
      handleSelection(xLastPlayed ? "O" : "X", number);
    }
  }

  return (
    <div className="game-board">
      {winner || xCells.length + oCells.length === cells.length ? (
        <Results winner={winner} />
      ) : (
        cells.map((cell) => (
          <Cell
            number={cell}
            isOneSelected={isOneSelected}
            setIsOneSelected={setIsOneSelected}
            selectedCell={selectedCell}
            xCells={xCells}
            oCells={oCells}
            handleCellClick={handleCellClick}
            handleSelection={handleSelection}
          />
        ))
      )}
      <button onClick={() => handleReset()}>
        {winner ? "Play again" : "Reset"}
      </button>
    </div>
  );
}
