import { useState } from 'react';
import './App.css';
import { GameBoard } from './components/GameBoard';
import { Player } from './components/Player';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  const updateActivePlayer = () => {
    setActivePlayer((prevPlayer) => prevPlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onUpdateActivePlayer={updateActivePlayer} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  );
}

export default App;
