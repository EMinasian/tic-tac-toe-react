import { useState, useRef } from "react";

export default function Player({
  player,
  setPlayers,
  playerKey,
  activePlayer,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { name, symbol } = player;

  const inputRef = useRef();

  function handleSave(e) {
    e.preventDefault();
    setPlayers((prevPlayers) => {
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
    <div className={activePlayer === playerKey && "active-player"}>
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
