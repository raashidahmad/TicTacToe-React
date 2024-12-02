
export interface GameBoardProps {
    onSelectSquare: (rowIndex: number, colIndex: number) => void
    gameBoard: any[]
}

export const GameBoard = ({ onSelectSquare, gameBoard } : GameBoardProps) => {
    
    return (
        <ol id="game-board">
            {gameBoard.map((row: [], rowIndex: number) => {
                return (<li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex: number) => {
                            return (
                                <li key={colIndex}>
                                    <button 
                                        onClick={() => onSelectSquare(rowIndex, colIndex)} 
                                        disabled={playerSymbol !== null}
                                        >
                                            {playerSymbol}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </li>);
            })}
        </ol>
    );
}