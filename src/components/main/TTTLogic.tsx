import { useState, useEffect } from 'react';
import './TTTLogic.css';
import Confetti from 'react-confetti'; // Install this package using `npm install react-confetti`

function TTTLogic() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [prevMove, setPrevMove] = useState('O');
  const [winner, setWinner] = useState<string | null>(null); // State to track the winner
  const [showMessage, setShowMessage] = useState(false); // State to show/hide the message

  useEffect(() => {
    checkWinner();
  }, [board]);

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
        setWinner(board[a]); // Set the winner
        setShowMessage(true); // Show the message
        setTimeout(() => setShowMessage(false), 3000); // Hide the message after 1 second
        setTimeout(() => setBoard(Array(9).fill('')), 3000); // Reset the board after 1.5 seconds
        setPrevMove('O');
        return;
      }
    }
  }

  function drawMove(cellId: number) {
    if (board[cellId] === '') {
      const newBoard = [...board];
      newBoard[cellId] = prevMove === 'X' ? 'O' : 'X';
      setBoard(newBoard);
      setPrevMove(prevMove === 'X' ? 'O' : 'X');
    } else {
      setShowMessage(true); // Show the message for an occupied cell
      setTimeout(() => setShowMessage(false), 3000); // Hide the message after 1 second
    }
  }

  return (
    <>
      {winner && (
        <Confetti 
          gravity={0.5}
          wind={0.05}
          recycle={false} // Confetti stops automatically
        />
      )}
      {showMessage && (
        <div className="message">
          {winner ? `¡Ganador: ${winner}!` : 'Celda ocupada'}
        </div>
      )}
      <h1>Turno actual: {prevMove === 'X' ? 'O' : 'X'}</h1>
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
        }}
      >
        Reiniciar
      </button>
    </>
  );
}

export default TTTLogic;