import { useState } from "react";

export default function Player({ initialName, symbol }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [ isEditing, setIsEditing] = useState(false);

  function handleEditClick(){
    setIsEditing(isEditing ? false : true);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing){
    editablePlayerName = <input type="text" required defaultValue={playerName}/>;
  }

  return (
 
    <li>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}