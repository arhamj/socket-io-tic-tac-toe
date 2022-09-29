import { players, gameBoards } from "../state";
import { getOpponent } from "./player";
import { alertPlayers } from "../helpers/alert_helper";
import { Socket } from "socket.io";

export default function resignHandler(socket: Socket) {
  delete gameBoards[players[socket.id].getBoardId];
  var opponentSocket = getOpponent(socket);

  let opponentWinner = players[socket.id].symbol === "X" ? "second" : "first";

  alertPlayers(socket, opponentSocket, "game_end", {
    reason: "resignation",
    winner: opponentWinner,
  });
}
