import { useContext } from "react";
import { boardContext } from "../contexts/BoardContext";

import "../Globals.css";

export default function SelectionModal({ number }) {
  const { handleSelection, setSelectedCell } = useContext(boardContext);

  return (
    <div className="selection-modal">
      <div>
        <button id="x-button" onClick={() => handleSelection("X", number)}>
          X
        </button>
        or
        <button id="o-button" onClick={() => handleSelection("O", number)}>
          O
        </button>
      </div>
      <button id="cancel-button" onClick={() => setSelectedCell(undefined)}>
        Cancel
      </button>
    </div>
  );
}
