import { Socket } from "socket.io";

export default class Player {
  opponent: string;
  symbol: string;
  socket: Socket;
  boardId?:string;

  constructor(
    opponent: string,
    symbol: string,
    socket: Socket,
    boardId?:string
  ) {
    this.opponent = opponent;
    this.symbol = symbol;
    this.socket = socket;
      this.boardId = boardId;
  }

  
  public get getBoardId() : string {
    if (this.boardId==undefined){
        throw "board id not set"
    }
    return this.boardId
  }
  
  
}
