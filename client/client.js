import { io } from "socket.io-client";
import readAndEmitMove from "./cli.js";

const args = process.argv.slice(2);

const socket = io(`http://${args[0]}:${args[1]}`);

socket.on("connect", (data) => connectHandler(data));

function connectHandler(data) {
  console.log("Connected to", args[0], args[1]);
  console.log("Waiting for an opponent...");
}

socket.on("game_start", (data) => {
  readAndEmitMove(socket);
});

socket.on("game_end", (data) => {
  let message = "";
  if (data.reason == "completed") {
    message = `Game won by ${data.winner} player`;
  } else if (data.reason == "resignation") {
    message = `Game won by ${data.winner} player due to resignation`;
  } else if (data.reason == "disconnect") {
    message = `Game won by ${data.winner} player since ${data.loser} player disconnected`;
  } else {
    message = `Game is tied`;
  }
  console.log(message);
  process.exit(0);
});

socket.on("message", (data) => {
  console.log(data.message);
});

socket.on("disconnect", function (data) {
  socket.emit("disconnected", args[0]);
  process.exit(0);
});
