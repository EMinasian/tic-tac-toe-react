import Cell from "./Cell";
import { CELLS } from "../utils/constants";

import "../Globals.css";

export default function Board() {
  return (
    <div className="game-board">
      {CELLS.map((cell) => (
        <Cell number={cell} key={cell} />
      ))}
    </div>
  );
}
