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
}) {

  const isX = xCells.includes(number);
  const isFilled = isX || oCells.includes(number);

  function handleOpenModal() {
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
    } else if (value === "O") {
      const nextCells = [...oCells, number];
      setOCells(nextCells);
      checkWin("O", nextCells);
    }
    setIsOneSelected(false);
  }

  return (
    <>
      {isOneSelected && selectedCell === number ? (
        <SelectionModal
          setIsOneSelected={setIsOneSelected}
          handleSelection={handleSelection}
        />
      ) : (
        <div className="board-cell" onClick={handleOpenModal}>
          {isFilled && (isX ? "X" : "O")}
        </div>
      )}
    </>
  );
}
