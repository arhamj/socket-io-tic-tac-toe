let players = {};
let waitingPlayer;
let gameBoards = {};

function setWaitingPlayer(incomingWaitingPlayer) {
  waitingPlayer = incomingWaitingPlayer;
}

export { players, waitingPlayer, setWaitingPlayer, gameBoards };
