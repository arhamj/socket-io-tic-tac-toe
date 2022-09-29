import { players, waitingPlayer, setWaitingPlayer, gameBoards } from "../state";
import crypto from "crypto";
import Board from "../model/board";
import { Socket } from "socket.io";
import Player from "../model/player";

function addPlayer(socket: Socket) {
  players[socket.id] = new Player(waitingPlayer, "X", socket);

  if (waitingPlayer==="") {
    let gameBoardId = crypto.randomBytes(20).toString("hex");
    players[socket.id].symbol = "O";
    players[socket.id].boardId = gameBoardId;
    players[waitingPlayer].opponent = socket.id;
    players[waitingPlayer].boardId = gameBoardId;
    gameBoards[gameBoardId] = new Board();

    alertPlayersOnSuccessfulMatch(socket);

    setWaitingPlayer("");
  } else {
    setWaitingPlayer(socket.id);
  }
}

function alertPlayersOnSuccessfulMatch(socket: Socket) {
  var opponentSocket = getOpponent(socket);
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

function getOpponent(socket: Socket): Socket {
  if (!players[socket.id].opponent) {
    throw "opponent socket not found";
  }
  return players[players[socket.id].opponent].socket;
}

export { addPlayer, getOpponent };
