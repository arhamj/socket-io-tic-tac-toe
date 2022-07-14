function alertPlayers(socket, opponentSocket, eventName, data) {
  socket.emit(eventName, data);
  opponentSocket.emit(eventName, data);
}

export { alertPlayers };
