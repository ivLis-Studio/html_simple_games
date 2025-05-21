// Game Variables
let randomNumber;
let attempts;
const maxAttempts = 10;

// HTML Element References (will be assigned in DOMContentLoaded)
let guessInput;
let guessButton;
let feedbackMessage;
let playAgainButton;
let gameArea; // To show/hide the game area or messages within it

// Function to start/reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    if (guessInput) {
        guessInput.value = "";
        guessInput.disabled = false;
    }
    if (guessButton) {
        guessButton.disabled = false;
    }
    if (feedbackMessage) {
        feedbackMessage.textContent = "Guess a number between 1 and 100.";
        feedbackMessage.className = ''; // Reset class for styling
    }
    if (playAgainButton) {
        playAgainButton.style.display = "none";
    }
    // console.log(`New random number: ${randomNumber}`); // For debugging
}

// Function to check the user's guess
function checkGuess() {
    if (!guessInput || !feedbackMessage || !guessButton || !playAgainButton) {
        console.error("Some HTML elements are not yet available.");
        return;
    }

    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedbackMessage.textContent = "Please enter a valid number between 1 and 100.";
        feedbackMessage.className = 'error';
        return;
    }

    if (userGuess === randomNumber) {
        feedbackMessage.textContent = `Correct! You got it in ${attempts} attempts.`;
        feedbackMessage.className = 'success';
        endGame();
    } else if (attempts >= maxAttempts) {
        feedbackMessage.textContent = `Sorry, you've reached the maximum of ${maxAttempts} attempts. The number was ${randomNumber}.`;
        feedbackMessage.className = 'error';
        endGame();
    } else if (userGuess < randomNumber) {
        feedbackMessage.textContent = "Too low! Try again.";
        feedbackMessage.className = 'info';
    } else {
        feedbackMessage.textContent = "Too high! Try again.";
        feedbackMessage.className = 'info';
    }
    guessInput.focus();
    guessInput.select();
}

// Function to end the game
function endGame() {
    if (guessInput) guessInput.disabled = true;
    if (guessButton) guessButton.disabled = true;
    if (playAgainButton) playAgainButton.style.display = "inline-block"; // Show play again button
}

// Event Listener for DOMContentLoaded to ensure elements are loaded
document.addEventListener('DOMContentLoaded', () => {
    // Assign HTML elements
    guessInput = document.getElementById("guessInput");
    guessButton = document.getElementById("guessButton");
    feedbackMessage = document.getElementById("feedbackMessage");
    playAgainButton = document.getElementById("playAgainButton");
    gameArea = document.getElementById("number-guessing-game-area"); // Though not directly used in this file yet

    // Add event listeners
    if (guessButton) {
        guessButton.addEventListener("click", checkGuess);
    } else {
        console.error("Guess button not found on DOMContentLoaded");
    }

    if (playAgainButton) {
        playAgainButton.addEventListener("click", resetGame);
    } else {
        console.error("Play Again button not found on DOMContentLoaded");
    }

    // Initialize the game
    resetGame();
});
