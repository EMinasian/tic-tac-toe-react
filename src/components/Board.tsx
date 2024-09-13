import React, { ReactNode } from "react";
import Cell from "./Cell";
import { CELLS } from "../utils/constants";

import "../Globals.css";

export default function Board(): ReactNode {
  return (
    <div className="game-board">
      {CELLS.map((cell) => (
        <Cell number={cell} key={cell} />
      ))}
    </div>
  );
}
