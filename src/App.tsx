import { useState } from 'react';
import './App.css';
import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';
import { Log } from './components/Log';
import { WINNING_COMBINATIONS } from './data/winning-combinations';
import { GameOver } from './components/GameOver';

const initialGameBoardState: any = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState<any[]>([]);

  const calculateActivePlayer = (gameTurns: any) => {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  }
  
  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns: any[]) => {
      let currentPlayer = calculateActivePlayer(prevTurns);
      const updatedTurns = [{
        square: {
          row: rowIndex,
          col: colIndex
        },
        player: currentPlayer
      }, ...prevTurns];
      return updatedTurns;
    });
  }

  const handleReplayGame = () => {
    setGameTurns([]);
  }

  let gameBoard = [...initialGameBoardState].map((subArray) => [...subArray]);
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const symbolOne = gameBoard[combination[0].row][combination[0].column];
    const symbolTwo = gameBoard[combination[1].row][combination[1].column];
    const symbolThree = gameBoard[combination[2].row][combination[2].column];

    if (symbolOne && symbolOne === symbolTwo && symbolOne == symbolThree) {
      winner = symbolOne;
    }
  }

  const activePlayer = calculateActivePlayer(gameTurns);
  const isDrawn = !winner && gameTurns.length === 9;
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        { (winner || isDrawn) && <GameOver winner={winner} replayGame={handleReplayGame} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          gameBoard={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
