import Board from "./model/board";
import Player from "./model/player";

let players: { [id: string]: Player } = {};
let waitingPlayer: string;
let gameBoards: { [id: string]: Board } = {};

function setWaitingPlayer(incomingWaitingPlayer: string) {
  waitingPlayer = incomingWaitingPlayer;
}

export { players, waitingPlayer, setWaitingPlayer, gameBoards };
