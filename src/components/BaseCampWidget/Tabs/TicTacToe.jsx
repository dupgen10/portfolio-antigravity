"use client";

import { useState } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null); // 'X', 'O', 'Draw'

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(Boolean)) return "Draw";
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }

    setIsPlayerTurn(false);
    
    // Computer move
    setTimeout(() => {
      // simple random AI for now
      const emptyIndices = newBoard.map((v, idx) => v === null ? idx : null).filter(v => v !== null);
      if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        newBoard[randomIdx] = "O";
        setBoard([...newBoard]);
        const computerWin = checkWinner(newBoard);
        if (computerWin) setWinner(computerWin);
      }
      setIsPlayerTurn(true);
    }, 400);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-[11px] uppercase tracking-widest font-bold mb-4" style={{ color: "var(--muted)" }}>
        {winner === "X" ? "You win 🏔️" : winner === "O" ? "Dupgen wins" : winner === "Draw" ? "Draw" : isPlayerTurn ? "Your move" : "Dupgen's move..."}
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            aria-label={`Cell ${i}`}
            disabled={!!winner || !isPlayerTurn || cell}
            className="w-14 h-14 rounded-md flex items-center justify-center text-xl font-bold cursor-none"
            style={{ 
              background: "var(--ink-2)", 
              border: "1px solid var(--border-2)",
              color: cell === "X" ? "var(--lime)" : "var(--ivory)"
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <button 
          onClick={resetGame}
          className="btn-primary !py-2 !px-4 !text-[11px]"
        >
          Play Again
        </button>
      )}
    </div>
  );
}
