import { VICTORY_PATTERNS } from "./constants";
import { CellsType } from "./types/types";

export default function checkWin(potentialWinner: string, cells: CellsType): string | undefined {
  for (const pattern of VICTORY_PATTERNS) {
    let hasWinner = true;
    for (const point of pattern) {
      if (cells.get(point) !== potentialWinner) {
        hasWinner = false;
        break;
      }
    }

    if (hasWinner) {
      // setCells rerenders, so no need for a separate statae variable
      return potentialWinner;
    }
  }
}
