import React, { ReactNode } from "react";
import checkMark from "../assets/green-check.png";
import xMark from "../assets/red-x.png";
import "../Globals.css"

const mockResults = [
  { game: 1, winner: "X" },
  { game: 3, winner: "O" },
  { game: 3, winner: "X" },
];

export default function GameBoard(): ReactNode {
  return (
    <table id="result-table">
      <thead>
        <tr>
          <th>Game</th>
          <th>X</th>
          <th>O</th>
        </tr>
      </thead>
      <tbody>
        {mockResults.map((result) => (
          <tr>
            <td>{`Number ${result.game}`}</td>
            <td>
              {result.winner === "X" ? (
                <img className="winner-marks" src={checkMark} />
              ) : (
                <img className="winner-marks" src={xMark} />
              )}
            </td>
            <td>
              {result.winner !== "X" ? (
                <img className="winner-marks" src={checkMark} />
              ) : (
                <img className="winner-marks" src={xMark} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
