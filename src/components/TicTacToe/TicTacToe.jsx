import React, { useEffect, useState } from 'react';
import './TicTacToe.css';
import cross_icon from '../Assets/cross.png';
import circle_icon from '../Assets/circle.png';

const TicTacToe = () => {

  const [count, setCount] = useState(0);
  const [data, setData] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);

  useEffect(()=>{
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let condition of winningConditions){
      const [a,b,c] = condition;
      if(data[a]&& data[a]=== data[b] && data[a]===data[c]){
        setWinner(data[a]);
        break;
      }
    }

    if(count ===9 && !winner){
      setWinner("draw");
    }
  },[data,count,winner]);


  const renderBoard = () => {
    return (
      <div className="board">
        <div className="row1">
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </div>
        <div className="row2">
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </div>
        <div className="row3">
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </div>
      </div>
    );
  };

  const renderCell = (num) =>{
    return(
      <div className="boxes" onClick={()=> toggle(num)}>
        {data[num]==='x'? <img src = {cross_icon} alt='cross'/>: data[num]==='o'? <img src={circle_icon} alt='circle'/>: null}
      </div>
    );
  };

  const toggle= (num) => {
    if(data[num]==="" && !winner){
      const newData = [...data];
      newData[num] = count%2 ===0?"x":"o";
      setData(newData);
      setCount(count+1);
    }
  }

  const resetGame =() =>{
    setData(Array(9).fill(""));
    setCount(0);
    setWinner(null);
  }

  const renderWinnerMessage = () => {
    if (winner === "draw") {
      return <div className="winner-message">It's a Draw!</div>;
    } else if (winner) {
      return <div className="winner-message">{winner.toUpperCase()} Wins!</div>;
    } else {
      return null;
    }
  };

  return (
    <div className='container'>
      <h1 className="title">Tic Tac Toe Game in <span>React</span></h1>
      {renderWinnerMessage()}
      {renderBoard()};
      <button className="reset" onClick={resetGame}>
        Reset
      </button>
    </div>
    
  );
};

export default TicTacToe;
