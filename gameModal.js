// gameModal.js
document.querySelectorAll('.open-game').forEach(button => {
    button.addEventListener('click', () => {
      const gameId = button.dataset.gameId;
      const gameModal = document.getElementById('game-modal');
      const gameContainer = document.getElementById('game-container');
  
      if (gameId === 'space-invaders') {
        gameContainer.innerHTML = `
          <link rel="stylesheet" href="invaderStyle.css" />
          <div class="gameBox">
            <canvas></canvas>
            <div class="interfaceBox">
              <div class="scoreBox"><span id="scoreCounter">0</span></div>
              <div class="controlInfoBox">← A | D →</div>
              <div class="gameInfoBox">SPACE = FIRE</div>
            </div>
          </div>
          <script src="spacePlayers.js"></script>
          <script src="spaceInvaders.js"></script>
        `;
      }
  
      gameModal.classList.remove('hidden');
    });
  });
  
  document.getElementById('close-game-modal').addEventListener('click', () => {
    const gameModal = document.getElementById('game-modal');
    const gameContainer = document.getElementById('game-container');
  
    gameContainer.innerHTML = ''; // Kill the game
    gameModal.classList.add('hidden');
  });
  