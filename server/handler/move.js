import { players, gameBoards } from "../state.js";
import { getOpponent } from "./player.js";
import { alertPlayers } from "../helpers/alert_helper.js";

export default function moveHandler(socket, msg) {
  if (msg > 9) {
    socket.emit("message", {
      message: "select a number between 1-9",
    });
  }
  try {
    let board = gameBoards[players[socket.id].boardId];
    board.move(players[socket.id].symbol, msg);
    var opponentSocket = getOpponent(socket, players);

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
