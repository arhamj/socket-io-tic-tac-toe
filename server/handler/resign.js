import { players, gameBoards } from "../state.js";
import { getOpponent } from "./player.js";
import { alertPlayers } from "../helpers/alert_helper.js";

export default function resignHandler(socket) {
  delete gameBoards[players[socket.id].boardId];
  var opponentSocket = getOpponent(socket, players);

  let opponentWinner = players[socket.id].symbol === "X" ? "second" : "first";

  alertPlayers(socket, opponentSocket, "game_end", {
    reason: "resignation",
    winner: opponentWinner,
  });
}
