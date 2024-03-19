import { useState, useRef } from "react";

export default function Player({
  player,
  setPlayers,
  playerKey,
  activePlayer,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();

  function handleSave(e) {
    e.preventDefault();
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      newPlayers[playerKey] = inputRef.current.value;
      return newPlayers;
    });
    setIsEditing(false);
  }

  function handleEdit() {
    setIsEditing(true);
  }

  return (
    <div className={activePlayer === playerKey && "active-player"}>
      {isEditing || !player ? (
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
        <>
          <span className="player-name" id="player-name-display">
            {player}
          </span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </div>
  );
}
