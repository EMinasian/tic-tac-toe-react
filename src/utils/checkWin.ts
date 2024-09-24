import { VICTORY_PATTERNS } from "./constants";
import { CellsType, PlayerSymbolType } from "./types/types";

export default function checkWin(potentialWinner: PlayerSymbolType, cells: CellsType): PlayerSymbolType | null {
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
  return null
}
