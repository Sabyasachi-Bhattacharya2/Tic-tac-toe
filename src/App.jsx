import Player from "./components/Player.jsx";
import Gameboard from "./components/Gameboard.jsx";
import {useState} from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import Gameover from "./components/Gameover.jsx";


const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]







function deriveActivePlayer(gameState) {
    let currPlayer = 'X';
    if(gameState.length > 0 && gameState[0].player === 'X') {
        currPlayer = 'O';
    }
    return currPlayer;
}


function App() {
    const [ gameState, setGameState ] = useState([]);


  let activePlayer = deriveActivePlayer(gameState);

    let gameBoard = [...initialBoard.map(inner => [...inner])];
  console.log(gameBoard);

    for (const turn of gameState) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;

    }

    let winner = null;

    for (const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
        if (firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol) {
            winner = firstSymbol;
        }

    }

    const hasDrawn = gameState.length === 9 && winner === null;

    function activePlayerSelection(rowIndex, colIndex) {

      setGameState(prevState => {
          const currPlayer = deriveActivePlayer(prevState);
          const updatedGameState = [
              {square: {row: rowIndex, col: colIndex}, player : currPlayer},
              ...prevState
          ];
          return updatedGameState;
      })
  }

  function restartGame() {
        console.log("restarting");
        setGameState([]);
  }


  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={"Player1"} symbol={"X"} isActive={activePlayer === 'X'}/>
          <Player initialName={"Player2"} symbol={"O"} isActive={activePlayer === 'O'}/>
        </ol>
          {(winner || hasDrawn) && <Gameover winner={winner} hasDrawn={hasDrawn} onSelection={restartGame}/> }
        <Gameboard onSelection={activePlayerSelection} board = {gameBoard}/>
      </div>
        <Log turns = {gameState}/>
    </main>
  )
}

export default App
