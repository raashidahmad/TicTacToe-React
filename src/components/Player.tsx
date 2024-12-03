import { useState } from "react";

export const Player = ({ initialName, symbol, isActive, updatePlayer }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    
    const updateEditState = () => {
        setIsEditing((editing) => !editing);

        if (!isEditing === false) {
            updatePlayer({
                [symbol]: playerName
            });
        }
    }

    let playerJsx = null;
    if (isEditing) {
        playerJsx =  <input 
        type="text" 
        required 
        value={playerName}
        onChange={(e) => {
            setPlayerName(e.target.value);
        }}
         />;
    } else {
        playerJsx = <span className="player-name">{playerName}</span>;
    }

    return (
        <>
            <li className={isActive ? 'active' : undefined}>
                <span className="player">
                    {playerJsx}
                    <span className="player-symbol">{symbol}</span>
                </span>
            </li>
            <button onClick={updateEditState}>{isEditing ? 'Save' : 'Edit'}</button>
        </>
    );
}