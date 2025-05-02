import { useState } from 'react';
import './Prueba.css';

function Prueba() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [prevMove, setPrevMove] = useState('O');

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

export default Prueba;