const cells = document.querySelectorAll(".cell");
  const message = document.querySelector(".message");
  const restartBtn = document.querySelector("#restart-btn");

  let currentPlayer = "X";
  let gameOver = false;
  let numMoves = 0;

  // Initialize the board
  const board = ["", "", "", "", "", "", "", "", ""];

  // Add event listener to each cell
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!gameOver && cell.textContent === "") {
        // Update the board array
        board[cell.id.split("-")[1]] = currentPlayer;
        // Update the cell text content
        cell.textContent = currentPlayer;
        // Check if the current player has won
        if (checkWin(currentPlayer)) {
          message.textContent = `${currentPlayer} wins!`;
          gameOver = true;
        } else if (++numMoves === 9) {
          // Check if the game is a tie
          message.textContent = "It's a tie!";
          gameOver = true;
        } else {
          // Switch to the other player
          currentPlayer = currentPlayer === "X" ? "O" : "X";
          message.textContent = `${currentPlayer}'s turn`;
        }
      }
    });
  });

  // Restart the game
  restartBtn.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currentPlayer = "X";
    gameOver = false;
    numMoves = 0;
    board.fill("");
    message.textContent = `${currentPlayer}'s turn`;
  });

  // Check if the specified player
  // Check if the specified player has won
  function checkWin(player) {
    if (
      // Horizontal win
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      // Vertical win
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      // Diagonal win
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    }
    return false;
  }