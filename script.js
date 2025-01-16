document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"
  ];

  const grid = document.querySelector('.grid');
  const congrats = document.getElementById('congrats');
  const claimButton = document.getElementById('claim-button');
  const prizeImageContainer = document.getElementById('prize-image-container');
  const prizeImage = document.getElementById('prize-image');
  const closeImage = document.getElementById('close-image');

  let gameLocked = false; 
  const prizeCount = {};
  const selectedSquares = {};

  initializeGame();

  claimButton.addEventListener('click', () => {
    window.location.href = "https://www.powerhands.es/minijuego-regalo-no-visible";
  });

  closeImage.addEventListener('click', () => {
    prizeImageContainer.classList.add('hidden');
  });

  function initializeGame() {
    resetGameState();
    generateSquares(9);
    assignPhrases();
  }

  function endGame(prize) {
    congrats.classList.remove('hidden');
    prizeImage.src =
      prize === "JUEGO DE BANDAS DE RESISTENCIA"
        ? "https://raw.githubusercontent.com/APCprograma/MINIJUEGO-WEB2/refs/heads/main/BANDAS%20DE%20RESISTENCIA.png"
        : "https://raw.githubusercontent.com/APCprograma/MINIJUEGO-WEB2/refs/heads/main/50%25%20DE%20DESCUENTO.png";
    prizeImageContainer.classList.remove('hidden');
    setTimeout(() => {
      claimButton.classList.remove('hidden');
    }, 2000);
  }

  function resetGameState() {
    gameLocked = false;
    prizeCount["JUEGO DE BANDAS DE RESISTENCIA"] = 0;
    prizeCount["¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"] = 0;
    selectedSquares["JUEGO DE BANDAS DE RESISTENCIA"] = [];
    selectedSquares["¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"] = [];
    congrats.classList.add('hidden');
    claimButton.classList.add('hidden');
    prizeImageContainer.classList.add('hidden');
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

  function assignPhrases() {
    const shuffledPhrases = shuffleArray([...phrases]);
    const squares = document.querySelectorAll('.square .back span');
    squares.forEach((span, index) => {
      span.textContent = shuffledPhrases[index];
    });
  }

  function handleSquareClick(event) {
    if (gameLocked) return;

    const square = event.target.closest('.square');
    if (!square || square.classList.contains('flipped')) return;

    revealSquare(square);
  }

  function revealSquare(square) {
    const prize = square.querySelector('.back span').textContent;

    prizeCount[prize] = (prizeCount[prize] || 0) + 1;

    if (!selectedSquares[prize]) {
      selectedSquares[prize] = [];
    }
    selectedSquares[prize].push(square);

    if (prizeCount[prize] === 3) {
      gameLocked = true;
      highlightWinningSquares(prize);
      endGame(prize);
    } else {
      square.classList.add('flipped');
    }
  }

  function highlightWinningSquares(prize) {
    const allSquares = document.querySelectorAll('.square');
    const winningSquares = selectedSquares[prize];

    allSquares.forEach(square => {
      square.style.opacity = winningSquares.includes(square) ? "1" : "0.3";
    });

    winningSquares.forEach(square => {
      square.classList.add('final-glow');
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});
