import { useState } from "react";
import SelectionModal from "./SelectionModal";
import "../Globals.css";

export default function Cell({
  number,
  isOneSelected,
  setIsOneSelected,
  selectedCell,
  setSelectedCell,
}) {
  const [isFilled, setIsFilled] = useState(false);
  const [isX, setIsX] = useState(false);

  function handleSelection() {
    if (isOneSelected || isFilled) {
      return;
    }
    setSelectedCell(number);
    setIsOneSelected(true);
  }
  return (
    <>
      {isOneSelected && selectedCell === number ? (
        <SelectionModal
          setIsFilled={setIsFilled}
          setIsX={setIsX}
          setIsOneSelected={setIsOneSelected}
        />
      ) : (
        <div className="board-cell" onClick={handleSelection}>
          {isFilled && (isX ? "X" : "O")}
        </div>
      )}
    </>
  );
}
