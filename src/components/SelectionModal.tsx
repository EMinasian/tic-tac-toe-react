import React, { ReactNode, useContext } from "react";
import { boardContext } from "../contexts/BoardContext";
import { PlayerValue } from "../utils/types/types";

import "../Globals.css";

export default function SelectionModal({ number }: { number: number }): ReactNode {
  const { handleSelection, setSelectedCell } = useContext(boardContext);

  return (
    <div className="selection-modal">
      <div>
        <button id="x-button" onClick={() => handleSelection(PlayerValue.VALUEX, number)}>
          X
        </button>
        or
        <button id="o-button" onClick={() => handleSelection(PlayerValue.VALUEO, number)}>
          O
        </button>
      </div>
      <button id="cancel-button" onClick={() => setSelectedCell(undefined)}>
        Cancel
      </button>
    </div>
  );
}
