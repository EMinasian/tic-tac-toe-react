import { useContext } from "react";
import SelectionModal from "./SelectionModal";
import { boardContext } from "../contexts/BoardContext";
import "../Globals.css";

export default function Cell({ number }) {
  const { handleCellClick, cells, selectedCell } = useContext(boardContext);
  const symbol = cells.get(number);

  return (
    <>
      {selectedCell === number ? (
        <SelectionModal number={number} />
      ) : (
        <button
          className="board-cell"
          onClick={() => handleCellClick(number)}
          disabled={symbol !== undefined}
        >
          {symbol}
        </button>
      )}
    </>
  );
}
