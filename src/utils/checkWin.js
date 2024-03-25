import { VICTORY_PATTERNS } from "./constants";

export default function checkWin(potentialWinner, cells) {
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
