import { useContext } from "react";
import SelectionModal from "./SelectionModal";
import { boardContext } from "../contexts/BoardContext";
import "../Globals.css";

export default function Cell({ number }) {
  const { handleCellClick, xCells, oCells, isOneSelected, selectedCell } =
  useContext(boardContext);
  const isX = xCells.includes(number);
  const isFilled = isX || oCells.includes(number);



  return (
    <>
      {isOneSelected && selectedCell === number ? (
        <SelectionModal number={number} />
      ) : (
        <div className="board-cell" onClick={() => handleCellClick(number)}>
          {isFilled && (isX ? "X" : "O")}
        </div>
      )}
    </>
  );
}
