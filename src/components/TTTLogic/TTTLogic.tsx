import { useState, useEffect } from 'react';
import './TTTLogic.css';
import Confetti from 'react-confetti';


function TTTLogic() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentMove, setCurrentMove] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isConffettiRunnng, setIsConffettiRunning] = useState(false);

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [board]);

  function resetGame() {
    setBoard(Array(9).fill(''));
    setCurrentMove('X');
    setWinner(null);
    setIsDraw(false);
    setShowMessage(false);
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setIsConffettiRunning(true);
        setShowMessage(true);
        setTimeout(resetGame, 3000);
        return;
      }
    }
  }

  function checkDraw() {
    if (board.every(cell => cell !== '') && !winner) {
      setIsDraw(true); // Establece el estado de empate
      setShowMessage(true);
      setTimeout(resetGame, 3000);
    }
  }

  function drawMove(cellId: number) {
    if (winner || isDraw)
      return;

    if (board[cellId] === '') {
      const newBoard = [...board];
      newBoard[cellId] = currentMove;
      setBoard(newBoard);
      setCurrentMove(currentMove === 'X' ? 'O' : 'X');
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }

  return (
    <>
      {isConffettiRunnng && (
        <Confetti 
          gravity={0.5}
          wind={0.05}
          recycle={false}
          numberOfPieces={100}
          onConfettiComplete={() => {setIsConffettiRunning(false)}}
        />
      )}
      {showMessage && (
        <div className="message">
          {winner
            ? `¡Ganador: ${winner}!`
            : isDraw
            ? '¡Empate!'
            : 'Celda ocupada'}
        </div>
      )}
      <h1>Turno actual: {currentMove}</h1>
      <div className="table-container">
        <table>
          <tbody>
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: 3 }, (_, j) => {
                  const cellId = i * 3 + j;
                  return (
                    <td key={cellId} onClick={() => drawMove(cellId)}>
                      {board[cellId]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="reset-button"
        onClick={() => {
          setBoard(Array(9).fill(''));
          setWinner(null);
          setIsDraw(false);
        }}
      >
        Reiniciar
      </button>
    </>
  );
}

export default TTTLogic;