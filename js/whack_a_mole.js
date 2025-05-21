// Game State Variables
let score = 0;
let timeLeft = 30; // Default 30 seconds
let moleInterval;
let timerInterval;
let activeMoleCell = null;
let moleHideTimeout; // To store the timeout for hiding a mole

// HTML Element References (will be assigned in DOMContentLoaded)
let moleScoreDisplay;
let moleTimeLeftDisplay;
let startMoleGameButton;
let moleGrid;
let moleCells = []; // Array to store cell elements

const GRID_SIZE = 9; // 3x3 grid

// Function to initialize/reset the game
function startGame() {
    score = 0;
    timeLeft = 30; // Reset time
    if (moleScoreDisplay) moleScoreDisplay.textContent = score;
    if (moleTimeLeftDisplay) moleTimeLeftDisplay.textContent = timeLeft;
    if (startMoleGameButton) startMoleGameButton.disabled = true;

    // Clear any existing mole
    if (activeMoleCell) {
        activeMoleCell.classList.remove('mole-active');
        activeMoleCell = null;
    }
    clearTimeout(moleHideTimeout); // Clear any pending mole hide

    // Clear previous intervals if any
    clearInterval(moleInterval);
    clearInterval(timerInterval);

    // Start the game timer
    timerInterval = setInterval(() => {
        timeLeft--;
        if (moleTimeLeftDisplay) moleTimeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Start showing moles
    moleInterval = setInterval(showMole, Math.random() * 1000 + 500); // Show mole every 0.5 - 1.5 seconds
}

// Function to display a mole in a random cell
function showMole() {
    // Clear previous mole if any
    if (activeMoleCell) {
        activeMoleCell.classList.remove('mole-active');
    }
    clearTimeout(moleHideTimeout); // Clear existing hide timeout

    // Select a random cell
    const randomIndex = Math.floor(Math.random() * GRID_SIZE);
    activeMoleCell = moleCells[randomIndex];
    if (activeMoleCell) {
        activeMoleCell.classList.add('mole-active');

        // Set timeout to hide the mole if not whacked
        moleHideTimeout = setTimeout(() => {
            if (activeMoleCell) {
                activeMoleCell.classList.remove('mole-active');
                activeMoleCell = null; // Mole escaped
            }
        }, 1000); // Mole stays for 1 second
    } else {
        console.error("Could not find a cell to show mole in:", randomIndex);
    }
}

// Function to handle whacking a mole
function whackMole(event) {
    // Check if the game is active (timeLeft > 0 and start button is disabled)
    if (timeLeft <= 0 || !startMoleGameButton || !startMoleGameButton.disabled) {
        return; // Game not active or already ended
    }

    if (event.target.classList.contains('mole-active') && event.target === activeMoleCell) {
        score++;
        if (moleScoreDisplay) moleScoreDisplay.textContent = score;

        // Immediately hide the whacked mole
        activeMoleCell.classList.remove('mole-active');
        clearTimeout(moleHideTimeout); // Prevent it from trying to hide again
        activeMoleCell = null;

        // Optional: Make next mole appear faster
        clearInterval(moleInterval);
        showMole(); // Show next mole immediately
        moleInterval = setInterval(showMole, Math.random() * 1000 + 500); // Restart interval
    }
}

// Function to end the game
function endGame() {
    clearInterval(moleInterval);
    clearInterval(timerInterval);
    clearTimeout(moleHideTimeout);

    if (activeMoleCell) {
        activeMoleCell.classList.remove('mole-active');
        activeMoleCell = null;
    }

    // Use alert for game over message for now, can be improved later
    alert(`Game Over! Your final score is: ${score}`);

    if (startMoleGameButton) startMoleGameButton.disabled = false;
    if (moleTimeLeftDisplay) moleTimeLeftDisplay.textContent = "30"; // Reset display
}

// DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
    moleScoreDisplay = document.getElementById('moleScore');
    moleTimeLeftDisplay = document.getElementById('moleTimeLeft');
    startMoleGameButton = document.getElementById('startMoleGameButton');
    moleGrid = document.getElementById('moleGrid');

    if (!moleScoreDisplay || !moleTimeLeftDisplay || !startMoleGameButton || !moleGrid) {
        console.error("Whack-a-Mole HTML elements not found. Ensure IDs are correct in index.html.");
        return;
    }

    // Create grid cells
    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('mole-cell');
        cell.id = `mole-cell-${i}`; // Unique ID for each cell
        moleGrid.appendChild(cell);
        moleCells.push(cell);
        cell.addEventListener('click', whackMole); // Add event listener to each cell
    }

    // Attach event listener to start button
    if (startMoleGameButton) {
        startMoleGameButton.addEventListener('click', startGame);
    }
});
