document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('memoryGameBoard');
    const movesDisplay = document.getElementById('memoryMoves');
    const matchesDisplay = document.getElementById('memoryMatches');
    const totalMatchesDisplay = document.getElementById('memoryTotalMatches');
    const resetButton = document.getElementById('memoryResetButton');

    const baseCardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // 8 pairs = 16 cards
    let cards = []; // To store card elements
    let flippedCards = [];
    let matchedPairs = 0;
    let totalPairs = baseCardValues.length;
    let moves = 0;
    let gameActive = true;

    function initializeGame() {
        moves = 0;
        matchedPairs = 0;
        flippedCards = [];
        gameActive = true;
        cards = []; // Clear the cards array

        movesDisplay.textContent = moves;
        matchesDisplay.textContent = matchedPairs;
        totalMatchesDisplay.textContent = totalPairs;

        gameBoard.innerHTML = ''; // Clear previous game board

        // Create card pairs and shuffle them
        let pairedValues = [...baseCardValues, ...baseCardValues];
        pairedValues.sort(() => Math.random() - 0.5); // Shuffle

        pairedValues.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.value = value;

            const cardFace = document.createElement('div');
            cardFace.classList.add('card-face');
            cardFace.textContent = value;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            // cardBack.textContent = '?'; // Optional: text on card back

            card.appendChild(cardFace);
            card.appendChild(cardBack);
            gameBoard.appendChild(card);
            cards.push(card);

            card.addEventListener('click', handleCardClick);
        });
    }

    function handleCardClick(event) {
        if (!gameActive || flippedCards.length >= 2) return;

        const clickedCard = event.currentTarget;

        // Prevent clicking on already matched or flipped cards
        if (clickedCard.classList.contains('matched') || clickedCard.classList.contains('flipped')) {
            return;
        }

        clickedCard.classList.add('flipped');
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            gameActive = false; // Lock board during check
            setTimeout(checkForMatch, 1000); // Use setTimeout to allow flip animation to show
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            matchesDisplay.textContent = matchedPairs;
            flippedCards = [];
            gameActive = true;

            if (matchedPairs === totalPairs) {
                endGame();
            }
        } else {
            // No match, flip back
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            gameActive = true;
        }
    }

    function endGame() {
        gameActive = false; // Game is over
        // Simple alert for now, can be improved
        setTimeout(() => { // Delay alert to allow last match animation/display
            alert(`Congratulations! You completed the game in ${moves} moves.`);
        }, 100);
    }

    if (resetButton) {
        resetButton.addEventListener('click', initializeGame);
    } else {
        console.error("Memory game reset button not found!");
    }
    
    // Initial call to set up the game
    // This will run when this script is loaded and DOM is ready.
    // If main.js controls visibility, this needs to be robust.
    // For now, assume memory-game-area might be hidden by main.js initially.
    // The game will initialize, but might not be visible until selected.
    initializeGame(); 
});
