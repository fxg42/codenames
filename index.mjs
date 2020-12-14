import express from 'express';
import http from 'http';
import { Server as Socket } from 'socket.io';
import * as codenames from './codenames.mjs';

const app = express();
const server = http.createServer(app);
const io = new Socket(server);

app.use(express.static('./static'));

const game = codenames.newGame();

io.on('connection', (socket) => {
  if (socket.handshake.query.board === 'spymaster') {
    socket.emit('init-game', { firstTeam: game.firstTeam, board: game.spymasterBoard });
  } else {
    socket.emit('init-game', { firstTeam: game.firstTeam, board: game.agentBoard });
    socket.on('pick-card', (cardIdx) => {
      game.agentBoard[cardIdx].team = game.key[cardIdx];
      io.emit('card-team', { cardIdx, team: game.agentBoard[cardIdx].team });
    });
  }
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
