import SelectionModal from "./SelectionModal";
import "../Globals.css";

export default function Cell({
  number,
  isOneSelected,
  setIsOneSelected,
  selectedCell,
  setSelectedCell,
  xCells,
  setXCells,
  oCells,
  setOCells,
  checkWin,
  xLastPlayed,
  setXLastPlayed,
}) {
  const isX = xCells.includes(number);
  const isFilled = isX || oCells.includes(number);

  function openModal() {
    if (isOneSelected || isFilled) {
      return;
    }
    setSelectedCell(number);
    setIsOneSelected(true);
  }

  function handleSelection(value) {
    if (value === "X") {
      const nextCells = [...xCells, number];
      setXCells(nextCells);
      checkWin("X", nextCells);
      setXLastPlayed(true);
    } else if (value === "O") {
      const nextCells = [...oCells, number];
      setOCells(nextCells);
      checkWin("O", nextCells);
      setXLastPlayed(false);
    }
    setIsOneSelected(false);
  }

  function handleCellClick() {
    if (xCells.length === 0 && oCells.length === 0) {
      openModal();
    } else {
      handleSelection(xLastPlayed ? "O" : "X");
    }
  }

  return (
    <>
      {isOneSelected && selectedCell === number ? (
        <SelectionModal
          setIsOneSelected={setIsOneSelected}
          handleSelection={handleSelection}
        />
      ) : (
        <div className="board-cell" onClick={handleCellClick}>
          {isFilled && (isX ? "X" : "O")}
        </div>
      )}
    </>
  );
}
