// Game State Variables
let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// HTML Element References
let ticTacToeStatus;
let ticTacToeBoard;
let ticTacToeCells;
let ticTacToeResetButton;

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return; // Cell already filled or game over
    }

    // Update game state and UI
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');


    if (checkWin()) {
        ticTacToeStatus.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        // Optional: Highlight winning cells - could be implemented later
    } else if (checkDraw()) {
        ticTacToeStatus.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        ticTacToeStatus.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check for a win
function checkWin() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            // Highlight winning cells
            if(ticTacToeCells) {
                ticTacToeCells[a].classList.add('winning-cell');
                ticTacToeCells[b].classList.add('winning-cell');
                ticTacToeCells[c].classList.add('winning-cell');
            }
            return true; // Win found
        }
    }
    return false; // No win
}

// Function to check for a draw
function checkDraw() {
    if (boardState.every(cell => cell !== "")) {
        // Check if it's a draw only if there's no winner
        if (!checkWin()) {
            return true; // All cells filled, no winner
        }
    }
    return false; // Not a draw
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    ticTacToeStatus.textContent = `Player ${currentPlayer}'s turn`;

    if (ticTacToeCells) {
        ticTacToeCells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('player-x', 'player-o', 'winning-cell');
        });
    }
}

// DOMContentLoaded listener for setup
document.addEventListener('DOMContentLoaded', () => {
    ticTacToeStatus = document.getElementById('ticTacToeStatus');
    ticTacToeBoard = document.getElementById('ticTacToeBoard');
    ticTacToeResetButton = document.getElementById('ticTacToeResetButton');

    if (!ticTacToeStatus || !ticTacToeBoard || !ticTacToeResetButton) {
        console.error("Tic-Tac-Toe HTML elements not found. Ensure IDs are correct in index.html.");
        return;
    }

    // Create cells and add to board (if not hardcoded in HTML)
    // For this implementation, we assume cells are hardcoded in HTML for simplicity
    // and will be fetched by a class or individual IDs if necessary.
    // However, it's better to create them dynamically or fetch them now.

    ticTacToeCells = document.querySelectorAll('.ttt-cell');

    if (ticTacToeCells.length !== 9) {
        console.error("Tic-Tac-Toe cells not found or incorrect number of cells. Make sure 9 elements with class 'ttt-cell' and data-index attributes exist.");
        // Fallback: Create cells dynamically if not found (more robust)
        if (ticTacToeBoard.children.length === 0) { // Only create if board is empty
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('ttt-cell');
                cell.setAttribute('data-index', i);
                ticTacToeBoard.appendChild(cell);
            }
            ticTacToeCells = document.querySelectorAll('.ttt-cell'); // Re-select cells
        } else if (ticTacToeCells.length === 0) {
             console.error("Cannot proceed without Tic Tac Toe cells.");
             return;
        }
    }


    ticTacToeCells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    ticTacToeResetButton.addEventListener('click', resetGame);

    // Initialize game
    resetGame();
});
