

export default function Gameover({ winner, hasDrawn, onSelection }) {
    let msg =  winner && <p>You win, {winner}!</p>;
    console.log(hasDrawn);
    if(hasDrawn) {
        msg = <p>Match Drawn</p>
    }

    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {msg}
            <button onClick={onSelection}>Rematch</button>
        </div>
    )
}