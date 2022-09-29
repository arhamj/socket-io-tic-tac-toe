import { players, gameBoards } from "../state";
import { getOpponent } from "./player";
import { alertPlayers } from "../helpers/alert_helper";
import { Socket } from "socket.io";

export default function disconnectHandler(socket: Socket) {
  delete gameBoards[players[socket.id].getBoardId];
  var opponentSocket = getOpponent(socket);

  let losingPlayer = players[socket.id].symbol === "X" ? "first" : "second";
  let opponentWinner = losingPlayer === "first" ? "second" : "first";

  alertPlayers(socket, opponentSocket, "game_end", {
    reason: "disconnect",
    winner: opponentWinner,
    loser: losingPlayer,
  });
}
