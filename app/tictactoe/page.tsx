"use client";

import React, { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type Nullable<T> = T | null;

const GameBoard = ({ socket }: { socket: Nullable<Socket> }) => {
  const [board, setBoard] = useState<Array<Nullable<string>>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X'|'O'>('X');
  const [winner, setWinner] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (!socket) return;
    const handler = (newBoard: Array<string | null>) => {
      setBoard(newBoard as any);
      setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
      playSound('move');
    };
    socket.on('receiveMove', handler);
    return () => { socket.off('receiveMove', handler); };
  }, [socket]);

  const calculateWinner = (b: Array<Nullable<string>>) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleMove = (index: number) => {
    if (board[index] || winner || !socket) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(prev => prev === 'X' ? 'O' : 'X');
    socket.emit('makeMove', newBoard);
    playSound('move');
    const w = calculateWinner(newBoard);
    if (w) { setWinner(w); playSound('win'); }
  };

  const resetGame = () => { setBoard(Array(9).fill(null)); setCurrentPlayer('X'); setWinner(null); };

  const playSound = (type: 'move'|'win') => {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const audioContext = new Ctx();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(type === 'move' ? 440 : 880, audioContext.currentTime);
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.setValueAtTime(0, audioContext.currentTime + 0.5);
    osc.start(); osc.stop(audioContext.currentTime + 0.5);
  };

  return (
    <div>
      <div className="text-xl font-bold text-center mb-4">Current Player: {currentPlayer}</div>
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        {board.map((v, i) => (
          <button key={i} onClick={() => handleMove(i)} disabled={!!v || !!winner} className="h-20 text-4xl bg-gray-100 hover:bg-gray-200 rounded">
            {v}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold">Winner: {winner}</div>
          <div className="mt-2">
            <button onClick={resetGame} className="px-3 py-1 bg-green-600 text-white rounded">Reset Game</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const socketRef = useRef<Nullable<Socket>>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);
  const [opponent, setOpponent] = useState<Nullable<string>>(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      await fetch('/api/socket');
      const s = io({ path: '/api/socket_io' });
      socketRef.current = s;
      s.on('connect', () => { if (!mounted) return; setIsConnected(true); });
      s.on('disconnect', () => { if (!mounted) return; setIsConnected(false); });
      s.on('opponentFound', (name: string) => { setOpponent(name); setIsInQueue(false); });
      s.on('gameEnded', () => { setOpponent(null); });
    };
    init();
    return () => { mounted = false; if (socketRef.current) socketRef.current.disconnect(); };
  }, []);

  const joinQueue = () => { socketRef.current?.emit('joinQueue'); setIsInQueue(true); };
  const leaveQueue = () => { socketRef.current?.emit('leaveQueue'); setIsInQueue(false); };
  const leaveGame = () => { socketRef.current?.emit('leaveGame'); setOpponent(null); };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
        <div className="mb-4">
          {isConnected ? (
            opponent ? (
              <div>
                <div className="mb-2">Playing against: {opponent}</div>
                <GameBoard socket={socketRef.current} />
                <div className="mt-3">
                  <button onClick={leaveGame} className="px-3 py-1 bg-red-600 text-white rounded">Leave Game</button>
                </div>
              </div>
            ) : (
              <div>
                {isInQueue ? (
                  <div>
                    <div className="mb-2">Waiting in queue...</div>
                    <button onClick={leaveQueue} className="px-3 py-1 bg-red-600 text-white rounded">Leave Queue</button>
                  </div>
                ) : (
                  <button onClick={joinQueue} className="px-4 py-2 bg-teal-600 text-white rounded">Join Queue</button>
                )}
              </div>
            )
          ) : (
            <div>Connecting to server...</div>
          )}
        </div>
      </div>
    </div>
  );
}
