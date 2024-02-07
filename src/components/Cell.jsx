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
    const nextCells = [...(value === "X" ? xCells : oCells), number];
    if (value === "X") {
      setXCells(nextCells);
    } else {
      setOCells(nextCells);
    }
    checkWin(value, nextCells);
    setXLastPlayed(value === "X");
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
