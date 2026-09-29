const cells = [...document.querySelectorAll(".cell")];
const status = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill("");
let currentPlayer = "X";
let gameOver = false;

function play(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer.toLowerCase());
  cells[index].disabled = true;

  const winningLine = winningLines.find(line =>
    line.every(i => board[i] === currentPlayer)
  );

  if (winningLine) {
    gameOver = true;
    status.textContent = `${currentPlayer} wins!`;
    cells.forEach(cell => {
      cell.disabled = true;
    });
  } else if (board.every(Boolean)) {
    gameOver = true;
    status.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o");
  });
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => play(index));
});

restartButton.addEventListener("click", resetGame);