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

const PLAYERS: any = {
  X: 'Player 1',
  O: 'Player 2'
}

function App() {
  const [gameTurns, setGameTurns] = useState<any[]>([]);
  const [players, setPlayers] = useState(PLAYERS);

  const calculateActivePlayer = (gameTurns: any) => {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  }

  const deriveGameBoard = (gameTurnsLog: any[]) => {
    let gameBoard = [...initialGameBoardState].map((subArray) => [...subArray]);
    for (const turn of gameTurnsLog) {
      const { square, player } = turn;
      const { row, col } = square;

      gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  const deriveWinner = (gameBoardState: any[]) => {
    let winner;
    for (const combination of WINNING_COMBINATIONS) {
      const symbolOne = gameBoardState[combination[0].row][combination[0].column];
      const symbolTwo = gameBoardState[combination[1].row][combination[1].column];
      const symbolThree = gameBoardState[combination[2].row][combination[2].column];

      if (symbolOne && symbolOne === symbolTwo && symbolOne == symbolThree) {
        winner = symbolOne;
      }
    }
    return winner;
  }

  const updatePlayers = (updatedPlayer: any) => {
    setPlayers({
      ...players,
      ...updatedPlayer
    });
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

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard);
  const activePlayer = calculateActivePlayer(gameTurns);
  const isDrawn = !winner && gameTurns.length === 9;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} updatePlayer={updatePlayers} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} updatePlayer={updatePlayers} />
        </ol>
        { (winner || isDrawn) && <GameOver winner={players[winner]} replayGame={handleReplayGame} />}
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
