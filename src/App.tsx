import React, { ReactNode, useState } from "react";
import Player from "./components/Player";
import Board from "./components/Board";
import Results from "./components/ResultsMessage";
import ResultsBoard from "./components/ResultsBoard";
import { BoardContextProvider } from "./contexts/BoardContext";
import { CELLS } from "./utils/constants";
import checkWin from "./utils/checkWin";
import { ActivePlayerType, PlayerType, CellsType } from "./utils/types/types";

import "./Globals.css";

let winner: string | null;

function App(): ReactNode {
  const [cells, setCells] = useState<CellsType>(new Map());
  const [selectedCell, setSelectedCell] = useState<number | undefined>(undefined);
  const [players, setPlayers] = useState<Array<PlayerType>>([
    { name: "", symbol: "" },
    { name: "", symbol: "" },
  ]);

  const activePlayer: ActivePlayerType = cells.size % 2 === 0 ? 0 : 1;

  function openModal(number: number | undefined): void {
    if (typeof selectedCell === "number") {
      return;
    }
    setSelectedCell(number);
  }

  function handleSelection(value: string, number: number): void {
    if (!players[activePlayer]?.symbol) {
      setPlayers((prev: Array<PlayerType>): Array<PlayerType> => {
        const updatedPlayers = [...prev];
        updatedPlayers[activePlayer].symbol = value;
        updatedPlayers[Number(activePlayer === 0)].symbol =
          value === "X" ? "O" : "X";
        return updatedPlayers;
      });
      players[activePlayer].symbol = value;
    }
    setCells((prev: CellsType): CellsType => {
      const updatedMap = new Map(Array.from(prev));
      updatedMap.set(number, value);
      winner = checkWin(value, updatedMap);
      return updatedMap;
    });
    setSelectedCell(undefined);
  }

  function handleCellClick(number: number): void {
    if (winner) {
      return;
    } else if (!players[activePlayer]?.symbol) {
      openModal(number);
    } else {
      handleSelection(players[activePlayer]?.symbol, number);
    }
  }

  function handleNewGame(): void {
    winner = null;
    setCells(new Map());
    setSelectedCell(undefined);
  }

  function handleReset(): void {
    handleNewGame();
    setPlayers([
      { name: "", symbol: "" },
      { name: "", symbol: "" },
    ]);
  }

  return (
    <div id="game-section">
      <div>
        <ul id="players-section">
          {players.map((player: PlayerType, playerKey: number): ReactNode => (
            <Player
              player={player}
              setPlayers={setPlayers}
              playerKey={playerKey}
              activePlayer={activePlayer}
              key={playerKey}
            />
          ))}
        </ul>
        {(winner || cells.size === CELLS.length) && <Results winner={winner} />}
        <BoardContextProvider
          value={{
            handleCellClick,
            handleSelection,
            cells,
            setSelectedCell,
            selectedCell,
          }}
        >
          <Board />
        </BoardContextProvider>
        <button onClick={(): void => handleNewGame()}>
          {winner ? "Play again" : "Start again"}
        </button>
        <button onClick={(): void => handleReset()}>Reset</button>
      </div>
      {/* <ResultsBoard /> */}
    </div>
  );
}

export default App;
