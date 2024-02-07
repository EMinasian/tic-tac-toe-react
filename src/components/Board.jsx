import { useState } from "react";
import Cell from "./Cell";

const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9];

import "../Globals.css";

export default function Board() {
  const [isOneSelected, setIsOneSelected] = useState(false);
  const [selectedCell, setSelectedCell] = useState(0);
  return (
    <div className="game-board">
      {cells.map((cell) => (
        <Cell
          number={cell}
          isOneSelected={isOneSelected}
          setIsOneSelected={setIsOneSelected}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
        />
      ))}
    </div>
  );
}
