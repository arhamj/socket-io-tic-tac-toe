import { Socket } from "socket.io";

function alertPlayers(
  socket: Socket,
  opponentSocket: Socket,
  eventName: string,
  data: {}
) {
  socket.emit(eventName, data);
  opponentSocket.emit(eventName, data);
}

export { alertPlayers };
