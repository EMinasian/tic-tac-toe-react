import SelectionModal from "./SelectionModal";
import "../Globals.css";

export default function Cell({
  number,
  isOneSelected,
  setIsOneSelected,
  selectedCell,
  xCells,
  oCells,
  handleCellClick,
  handleSelection,
}) {
  const isX = xCells.includes(number);
  const isFilled = isX || oCells.includes(number);

  return (
    <>
      {isOneSelected && selectedCell === number ? (
        <SelectionModal
          setIsOneSelected={setIsOneSelected}
          handleSelection={handleSelection}
          number={number}
        />
      ) : (
        <div className="board-cell" onClick={() => handleCellClick(number)}>
          {isFilled && (isX ? "X" : "O")}
        </div>
      )}
    </>
  );
}
