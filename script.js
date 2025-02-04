document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const congrats = document.getElementById('congrats');
  const claimButton = document.getElementById('claim-button');
  const overlay = document.getElementById('overlay');

  let gameLocked = false;
  let selectedCount = 0;
  let premiumCount = 0;
  let normalCount = 0;

  initializeGame();

  claimButton.addEventListener('click', () => {
    window.location.href = "https://www.powerhands.es/minijuego-regalo-no-visible";
  });

  function initializeGame() {
    resetGameState();
    generateSquares(9);
  }

  function generateSquares(count) {
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const square = document.createElement('div');
      square.className = 'square';
      square.innerHTML = `
        <div class="inner">
          <div class="front"></div>
          <div class="back"><span></span></div>
        </div>
      `;
      grid.appendChild(square);
    }

    grid.addEventListener('click', handleSquareClick);
  }

  function handleSquareClick(event) {
    if (gameLocked) return;

    const square = event.target.closest('.square');
    if (!square || square.classList.contains('flipped')) return;

    revealSquare(square);
  }

  function revealSquare(square) {
    let prize = getRandomPrize();
    square.querySelector('.back span').textContent = prize;
    square.classList.add('flipped');

    if (prize === "REGALO PREMIUM") {
      premiumCount++;
    } else {
      normalCount++;
    }

    selectedCount++;

    if (premiumCount === 3) {
      gameLocked = true;
      highlightWinningSquares();
      endGame();
    }
  }

  function getRandomPrize() {
    if (normalCount === 2) {
      return "REGALO PREMIUM";
    }
    return Math.random() < 0.7 ? "REGALO NORMAL" : "REGALO PREMIUM";
  }

  function highlightWinningSquares() {
    document.querySelectorAll('.square.flipped').forEach(square => {
      const text = square.querySelector('.back span').textContent;
      if (text === "REGALO PREMIUM") {
        applyHeartbeatEffect(square);
      }
    });
  }

  function applyHeartbeatEffect(square) {
    let grow = true;

    setInterval(() => {
      if (!gameLocked) return; // Evitar que siga el efecto si el juego se reinicia
      square.style.transform = grow ? "scale(1.1)" : "scale(1.0)";
      grow = !grow;
    }, 300); // 🔹 Se redujo el tiempo de 500ms a 300ms para mayor velocidad
  }

  function endGame() {
    congrats.classList.remove('hidden');
    setTimeout(() => {
      claimButton.classList.remove('hidden');
      overlay.classList.add('active');
    }, 2000);
  }

  function resetGameState() {
    gameLocked = false;
    selectedCount = 0;
    premiumCount = 0;
    normalCount = 0;
    document.querySelectorAll('.square').forEach(square => {
      square.classList.remove('flipped', 'final-glow');
      square.style.opacity = "1";
      square.style.transform = "scale(1.0)"; // Resetear transformación
      square.querySelector('.back span').textContent = "";
    });
    congrats.classList.add('hidden');
    claimButton.classList.add('hidden');
    overlay.classList.remove('active');
  }
});
