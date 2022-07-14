import {
  players,
  waitingPlayer,
  setWaitingPlayer,
  gameBoards,
} from "../state.js";
import crypto from "crypto";
import Board from "../model/board.js";

function addPlayer(socket) {
  players[socket.id] = {
    opponent: waitingPlayer,
    symbol: "X",
    socket: socket,
    boardId: null,
  };

  if (waitingPlayer) {
    let gameBoardId = crypto.randomBytes(20).toString("hex");
    players[socket.id].symbol = "O";
    players[socket.id].boardId = gameBoardId;
    players[waitingPlayer].opponent = socket.id;
    players[waitingPlayer].boardId = gameBoardId;
    gameBoards[gameBoardId] = new Board();

    alertPlayersOnSuccessfulMatch(socket);

    setWaitingPlayer(null);
  } else {
    setWaitingPlayer(socket.id);
  }
}

function alertPlayersOnSuccessfulMatch(socket) {
  var opponentSocket = getOpponent(socket, players);
  let playerNumberStr = players[socket.id].symbol === "X" ? "first" : "second";
  let opponentPlayerNumberStr =
    playerNumberStr === "first" ? "second" : "first";
  socket.emit("message", {
    message: `Game started. You are the ${playerNumberStr} player`,
  });
  opponentSocket.emit("message", {
    message: `Game started. You are the ${opponentPlayerNumberStr} player`,
  });
}

function getOpponent(socket) {
  if (!players[socket.id].opponent) {
    return;
  }
  return players[players[socket.id].opponent].socket;
}

export { addPlayer, getOpponent };
