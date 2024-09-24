import React, { useState, useRef, ReactNode } from "react";
import { ActivePlayerType, PlayerType } from "../utils/types/types";

export default function Player({
  player,
  setPlayers,
  playerKey,
  activePlayer,
}: {
  player: PlayerType,
  setPlayers: (arg: (prevPlayersarg: Array<PlayerType>) => Array<PlayerType>) => void;
  playerKey: number;
  activePlayer: ActivePlayerType;

}): ReactNode {
  const [isEditing, setIsEditing] = useState(false);
  const { name, symbol } = player;

  const inputRef = useRef();

  function handleSave(e: React.SyntheticEvent): void {
    e.preventDefault();
    setPlayers((prevPlayers: Array<PlayerType>): Array<PlayerType> => {
      const newPlayers = [...prevPlayers];
      newPlayers[playerKey].name = inputRef.current.value;
      return newPlayers;
    });
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className={activePlayer === playerKey ? "active-player" : ""}>
      <span className="player-name" id="player-name-display">
        {symbol}
      </span>
      {isEditing || !name ? (
        <form onSubmit={(e) => handleSave(e)}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Insert Name"
            required
            className="player-name"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <span className="player-name" id="player-name-display">
            {name}
          </span>

          <button onClick={handleEdit}>Edit name</button>
        </div>
      )}
    </div>
  );
}
