interface IGameOver {
    winner: string,
    replayGame: () => void
}
export const GameOver = ({winner, replayGame} : IGameOver) => {
    return (
        <div id="game-over">
            { !winner && <p>Match Drawn</p> }
            { winner && <p>{winner} won the game. Congratulations!</p> }
            <button onClick={replayGame}>Re-Play</button>
        </div>
    )
}