import { useState } from "react";
import Victory from "./Victory";
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

  return (
    <div className="game-board">
      {winner ? (
        <Victory winner={winner} />
      ) : (
        cells.map((cell) => (
          <Cell
            number={cell}
            isOneSelected={isOneSelected}
            setIsOneSelected={setIsOneSelected}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            xCells={xCells}
            setXCells={setXCells}
            oCells={oCells}
            setOCells={setOCells}
            checkWin={checkWin}
          />
        ))
      )}
    </div>
  );
}
