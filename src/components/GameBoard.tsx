import { useState } from "react";

const initialGameBoardState: any = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

export const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(initialGameBoardState);

    const updateGameBoard = (rowIndex: number, colIndex: number) => {
        setGameBoard((prevState: any) => {
            let gameBoardState = [...prevState.map((row: []) => [...row])];
            gameBoardState[rowIndex][colIndex] = 'X';
            return gameBoardState;
        });
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