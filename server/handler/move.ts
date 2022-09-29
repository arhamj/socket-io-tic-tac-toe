import { players, gameBoards } from "../state";
import { getOpponent } from "./player";
import { alertPlayers } from "../helpers/alert_helper";
import { Socket } from "socket.io";

export default function moveHandler(socket: Socket, msg: number) {
  if (msg > 9) {
    socket.emit("message", {
      message: "select a number between 1-9",
    });
  }
  try {
    let board = gameBoards[players[socket.id].getBoardId];
    board.move(players[socket.id].symbol, msg);
    var opponentSocket = getOpponent(socket);

    let boardString = board.displayBoard();
    alertPlayers(socket, opponentSocket, "message", {
      message: boardString,
    });

    if (board.hasWinner()) {
      let winner = board.getWinner();
      alertPlayers(socket, opponentSocket, "game_end", {
        reason: "completed",
        winner: winner,
      });
      delete gameBoards[players[socket.id].getBoardId];
    }

    if (board.isDraw()) {
      alertPlayers(socket, opponentSocket, "game_end", {
        reason: "draw",
      });
    }
  } catch (err) {
    socket.emit("message", {
      message: err,
    });
  }
}
