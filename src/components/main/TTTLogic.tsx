import { useState, useEffect } from 'react';
import './TTTLogic.css';

function TTTLogic() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [prevMove, setPrevMove] = useState('O');

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
        setTimeout(() => alert(`Ganador: ${board[a]}`), 0);
        setBoard(Array(9).fill(''));
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
      alert('Celda ocupada');
    }
  }

  return (
    <>
      <h1>Turno actual: {prevMove === 'X' ? 'O' : 'X'}</h1> {/* Muestra el turno actual */}
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
      <button className="reset-button" onClick={() => setBoard(Array(9).fill(''))}>
        Reiniciar
      </button>
    </>
  );
}

export default TTTLogic;