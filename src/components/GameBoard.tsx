import { useState } from "react";

const initialGameBoardState: any = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export interface GameBoardProps {
    onUpdateActivePlayer: () => void
    activePlayerSymbol: string
}

export const GameBoard = ({ onUpdateActivePlayer, activePlayerSymbol } : GameBoardProps) => {
    const [gameBoard, setGameBoard] = useState(initialGameBoardState);

    const updateGameBoard = (rowIndex: number, colIndex: number) => {
        setGameBoard((prevState: any) => {
            let gameBoardState = [...prevState.map((row: []) => [...row])];
            gameBoardState[rowIndex][colIndex] = activePlayerSymbol;
            return gameBoardState;
        });

        onUpdateActivePlayer();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row: [], rowIndex: number) => {
                return (<li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex: number) => {
                            return (
                                <li key={colIndex}>
                                    <button onClick={() => updateGameBoard(rowIndex, colIndex)} >{playerSymbol}</button>
                                </li>
                            );
                        })}
                    </ol>
                </li>);
            })}
        </ol>
    );
}