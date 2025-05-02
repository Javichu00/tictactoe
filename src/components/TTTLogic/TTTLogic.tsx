import { useState, useEffect } from 'react';
import './TTTLogic.css';
import Confetti from 'react-confetti';

function TTTLogic() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [prevMove, setPrevMove] = useState('O');
  const [winner, setWinner] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [isDraw, setIsDraw] = useState(false); // Estado para manejar el empate

  useEffect(() => {
    checkWinner();
    checkDraw();
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
        setWinner(null);
        setTimeout(() => {
          setWinner(board[a]);
        }, 50);

        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        setTimeout(() => setBoard(Array(9).fill('')), 3000);
        setPrevMove('O');
        return;
      }
    }
  }

  function checkDraw() {
    if (board.every(cell => cell !== '') && !winner) {
      setIsDraw(true); // Establece el estado de empate
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setIsDraw(false); // Reinicia el estado de empate
        setBoard(Array(9).fill('')); // Reinicia el tablero
        setPrevMove('O');
      }, 3000);
    }
  }

  function drawMove(cellId: number) {
    if (board[cellId] === '') {
      const newBoard = [...board];
      newBoard[cellId] = prevMove === 'X' ? 'O' : 'X';
      setBoard(newBoard);
      setPrevMove(prevMove === 'X' ? 'O' : 'X');
    } else {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  }

  return (
    <>
      {winner && (
        <Confetti 
          gravity={0.5}
          wind={0.05}
          recycle={false}
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
          setIsDraw(false);
        }}
      >
        Reiniciar
      </button>
    </>
  );
}

export default TTTLogic;