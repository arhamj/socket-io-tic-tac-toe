import { Server } from "socket.io";
import { addPlayer, getOpponent } from "./handler/player.js";
import moveHandler from "./handler/move.js";
import resignHandler from "./handler/resign.js";
import disconnectHandler from "./handler/disconnect.js";
import { players } from "./state.js";

const args = process.argv.slice(2);

const io = new Server(args[0]);

io.on("connection", function (socket) {
  console.log("Connection established:", socket.id);
  addPlayer(socket);

  var opponentSocket = getOpponent(socket, players);
  if (opponentSocket) {
    console.debug("Game started between", socket.id, opponentSocket.id);
    socket.emit("game_start", {
      symbol: players[socket.id].symbol,
    });
    opponentSocket.emit("game_start", {
      symbol: players[opponentSocket.id].symbol,
    });
  }

  // on move from client
  socket.on("move", (msg) => moveHandler(socket, msg));

  // on resignation
  socket.on("resign", (msg) => resignHandler(socket));

  // on disconnection
  socket.on("disconnected", (msg) => disconnectHandler(socket));
});
