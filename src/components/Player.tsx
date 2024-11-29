import { useState } from "react";

export const Player = ({ initialName, symbol }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);
    
    const updateEditState = () => {
        setIsEditing((editing) => !editing);
    }

    return (
        <>
            <li className="player">
                {
                    !isEditing
                    &&
                    <>
                        <span className="player-name">{playerName}</span>
                    </>
                }
                {
                    isEditing
                    &&
                        <input 
                            type="text" 
                            required 
                            value={playerName}
                            onChange={(e) => {
                                setPlayerName(e.target.value);
                            }}
                             />
                }
                <span className="player-symbol">{symbol}</span>
            </li>
            <button onClick={updateEditState}>{isEditing ? 'Save' : 'Edit'}</button>
        </>
    );
}