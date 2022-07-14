export default class Board {
  constructor() {
    this.boardState = [".", ".", ".", ".", ".", ".", ".", ".", "."];
    this.isXTurn = true;
    this.winner = null;
    this.moveCount = 0;
  }

  getWinner() {
    return this.winner;
  }

  displayBoard() {
    var output = "\n";
    for (let i = 0; i < this.boardState.length; i++) {
      output += this.boardState[i];
      output += "   ";
      if ((i + 1) % 3 == 0) output += "\n";
    }
    return output;
  }

  move(symbol, position) {
    if (this.isXTurn && symbol != "X") {
      throw "wait for your turn";
    } else if (!this.isXTurn && symbol != "O") {
      throw "wait for your turn";
    }
    if (this.boardState[position - 1] != ".") {
      throw "invalid move";
    }
    this.boardState[position - 1] = symbol == "X" ? "X" : "O";
    this.moveCount++;
    this.isXTurn = !this.isXTurn;
    this.computeWinner();
  }

  hasWinner() {
    return this.winner !== null;
  }

  isDraw() {
    this.computeWinner();
    return this.moveCount >= 9 && this.winner === null;
  }

  computeWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    winningCombinations.forEach((w) => {
      const hasCombinationWon =
        this.boardState[w[0]] !== "." &&
        this.boardState[w[0]] === this.boardState[w[1]] &&
        this.boardState[w[1]] === this.boardState[w[2]];
      if (hasCombinationWon) {
        if (this.boardState[w[0]] === "X") {
          this.winner = "first";
        } else {
          this.winner = "second";
        }
      }
    });
  }
}
