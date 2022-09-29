import { Server } from "socket.io";
import { addPlayer, getOpponent } from "./handler/player";
import moveHandler from "./handler/move";
import resignHandler from "./handler/resign";
import disconnectHandler from "./handler/disconnect";
import { players } from "./state";

const args = process.argv.slice(2);

const io = new Server({ path: args[0] });

io.on("connection", function (socket) {
  console.log("Connection established:", socket.id);
  addPlayer(socket);

  var opponentSocket = getOpponent(socket);
  if (opponentSocket) {
    console.debug("Game started between", socket.id, opponentSocket.id);
    socket.emit("game_start", {
      symbol: players[socket.id].symbol,
    });
    opponentSocket.emit("game_start", {
      symbol:  players[opponentSocket.id].symbol,
    });;
  }

  // on move from client
  socket.on("move", (msg) => moveHandler(socket, msg));

  // on resignation
  socket.on("resign", (msg) => resignHandler(socket));

  // on disconnection
  socket.on("disconnected", (msg) => disconnectHandler(socket));
});
