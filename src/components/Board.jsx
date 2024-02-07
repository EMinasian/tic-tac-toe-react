import Cell from "./Cell";
import "../Globals.css";

export default function Board() {
  return (
    <div className="game-board">
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </div>
  );
}
