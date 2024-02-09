import { useState, useRef } from "react";

export default function Player() {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(undefined);

  const inputRef = useRef();

  function handleSave() {
    setPlayerName(inputRef.current.value);
    setIsEditing(false);
  }

  function handleEdit() {
    setPlayerName(undefined);
    setIsEditing(true);
  }

  return (
    <>
      {isEditing || !playerName ? (
        <form onSubmit={handleSave}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Insert Name"
            value={playerName}
            required
            className="player-name"
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span className="player-name" id="player-name-display">{playerName}</span>
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
    </>
  );
}
