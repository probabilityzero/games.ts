import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const anyRes: any = res;
  if (anyRes.socket?.server?.io) {
    res.end();
    return;
  }

  const io = new Server(anyRes.socket.server, {
    path: '/api/socket_io',
    addTrailingSlash: false,
  });

  anyRes.socket.server.io = io;

  const players: any[] = [];

  io.on('connection', (socket: any) => {
    socket.on('joinQueue', () => {
      players.push(socket);
      if (players.length >= 2) {
        const player1 = players.shift();
        const player2 = players.shift();

        player1.emit('opponentFound', 'Player 2');
        player2.emit('opponentFound', 'Player 1');

        player1.on('makeMove', (newBoard: any) => {
          player2.emit('receiveMove', newBoard);
        });

        player2.on('makeMove', (newBoard: any) => {
          player1.emit('receiveMove', newBoard);
        });

        player1.on('leaveGame', () => {
          player2.emit('gameEnded');
        });

        player2.on('leaveGame', () => {
          player1.emit('gameEnded');
        });
      }
    });

    socket.on('leaveQueue', () => {
      const index = players.indexOf(socket);
      if (index > -1) players.splice(index, 1);
    });

    socket.on('disconnect', () => {
      const index = players.indexOf(socket);
      if (index > -1) players.splice(index, 1);
    });
  });

  res.end();
}
