import { useState } from 'react'
import './Prueba.css'

function Prueba() {



  return (
    <>
      <div className="table-container">
        <table>
          <tbody>
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: 3 }, (_, j) => (
                  {const cellId = i*3+j+1}
                  <td key={j} onClick={function1()}>Cell </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Prueba
