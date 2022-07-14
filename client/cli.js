import readcommand from "readcommand";

export default function readAndEmitMove(socket) {
  var signal = {
    times: 0,
  };
  readcommand.loop(function (err, args, str, next) {
    shutdown(socket, signal, err, next);
    if (args[0] === "r") {
      socket.emit("resign", args[0]);
      process.exit(0);
    } else if (args[0] <= 9 && args[0] >= 1) {
      socket.emit("move", args[0]);
    } else {
      console.log("invalid move, select a number between 1-9");
    }
    return next();
  });
}

function shutdown(socket, signal, err, next) {
  if (err && err.code !== "SIGINT") {
    throw err;
  } else if (err) {
    if (signal.times === 1) {
      socket.emit("disconnected", {});
      process.exit(0);
    } else {
      signal.times++;
      console.log("Press ^C again to exit.");
      return next();
    }
  } else {
    signal.times = 0;
  }
}
