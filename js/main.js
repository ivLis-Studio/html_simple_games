// Game selection logic
document.addEventListener('DOMContentLoaded', () => {
    const gameNavLinks = document.querySelectorAll('nav .game-nav-link');
    const gameAreas = document.querySelectorAll('#game-container > div.game-area'); // More specific selector
    const defaultGameId = 'number-guessing-game-area';
    let isInitialLoad = true;

    function showGame(gameAreaIdToShow) {
        if (isInitialLoad) {
            // Instant load for the first game
            gameAreas.forEach(area => {
                if (area.id === gameAreaIdToShow) {
                    area.style.display = 'flex'; // All current games use flex
                    area.style.opacity = '1';
                } else {
                    area.style.display = 'none';
                    area.style.opacity = '0'; // Keep opacity consistent for future transitions
                }
            });
            isInitialLoad = false;
        } else {
            // Fade-out/fade-in for subsequent game changes
            gameAreas.forEach(area => {
                if (area.id !== gameAreaIdToShow && area.style.display !== 'none') {
                    area.style.opacity = '0';
                    setTimeout(() => {
                        area.style.display = 'none';
                    }, 300); // Match opacity transition time from CSS (.game-area)
                }
            });

            const gameToShow = document.getElementById(gameAreaIdToShow);
            if (gameToShow) {
                // If it was hidden, set display and then fade in
                if (gameToShow.style.display === 'none') {
                    setTimeout(() => { // Ensure fade-out of others can start
                        gameToShow.style.display = 'flex'; // All current games use flex
                        void gameToShow.offsetWidth; // Trigger reflow
                        gameToShow.style.opacity = '1';
                    }, 50); // Small delay to ensure previous display:none has taken effect if switching rapidly
                } else { // If already visible (e.g. direct click on active link), just ensure opacity
                    gameToShow.style.opacity = '1';
                }
            } else {
                console.warn(`Game area with ID '${gameAreaIdToShow}' not found.`);
            }
        }

        // Update active class on nav links
        gameNavLinks.forEach(link => {
            if (link.getAttribute('data-game') === gameAreaIdToShow) {
                link.classList.add('active-game-link');
            } else {
                link.classList.remove('active-game-link');
            }
        });
    }

    // Add event listeners to navigation links
    gameNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const gameId = link.getAttribute('data-game');
            if (gameId) {
                showGame(gameId);
            }
        });
    });

    // Initial game display
    if (defaultGameId) {
        showGame(defaultGameId);
    } else {
        // If no default game, hide all (already done by showGame if called with invalid ID, or do explicitly)
        gameAreas.forEach(area => {
            area.style.display = 'none';
        });
    }
});
