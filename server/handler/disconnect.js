import { players, gameBoards } from "../state.js";
import { getOpponent } from "./player.js";
import { alertPlayers } from "../helpers/alert_helper.js";

export default function disconnectHandler(socket) {
  delete gameBoards[players[socket.id].boardId];
  var opponentSocket = getOpponent(socket, players);

  let losingPlayer = players[socket.id].symbol === "X" ? "first" : "second";
  let opponentWinner = losingPlayer === "first" ? "second" : "first";

  alertPlayers(socket, opponentSocket, "game_end", {
    reason: "disconnect",
    winner: opponentWinner,
    loser: losingPlayer,
  });
}
