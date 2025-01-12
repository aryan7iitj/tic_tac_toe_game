const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let board = Array(9).fill(null); // 3x3 grid as a flat array
let currentPlayer = 'X'; // 'X' starts the game
let gameActive = true;

// Initialize the game board
function initBoard() {
  boardElement.innerHTML = '';
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    boardElement.appendChild(cell);
  });
  updateMessage(`Player ${currentPlayer}'s turn`);
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] || !gameActive) {
    return; // Ignore if the cell is already taken or the game is over
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    updateMessage(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (board.every(cell => cell)) {
    updateMessage('It\'s a draw!');
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(`Player ${currentPlayer}'s turn`);
  }
}

// Check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Update the message display
function updateMessage(message) {
  messageElement.textContent = message;
}

// Reset the game
resetButton.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  initBoard();
});

// Initialize the game on page load
initBoard();
