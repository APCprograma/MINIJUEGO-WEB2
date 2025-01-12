document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA", // Ahora hay 6
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!" // Ahora hay 3
  ];

  const grid = document.querySelector('.grid');
  const congrats = document.getElementById('congrats');
  const claimButton = document.getElementById('claim-button');
  const overlay = document.getElementById('overlay');

  const prizeCount = {};
  const selectedSquares = {};

  initializeGame();

  claimButton.addEventListener('click', () => {
    window.location.href = "https://www.powerhands.es/minijuego-regalo-no-visible";
  });

  function initializeGame() {
    resetGameState();
    generateSquares(9);
    assignPhrases();
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
      suspenseAnimation(prize, square);
    } else {
      square.classList.add('flipped');
    }
  }

  function suspenseAnimation(prize, finalSquare) {
    const squares = selectedSquares[prize];

    setTimeout(() => {
      squares[0].classList.add('final-glow');
    }, 0);

    setTimeout(() => {
      squares[1].classList.add('final-glow');
    }, 1500);

    setTimeout(() => {
      finalSquare.style.boxShadow = "0 0 40px rgba(0, 114, 255, 1)";
    }, 2000);

    setTimeout(() => {
      finalSquare.classList.add('flipped');
      highlightWinningSquares(prize);
      endGame(prize);
    }, 3000);
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

  function endGame(prize) {
    congrats.classList.remove('hidden');
    setTimeout(() => {
      claimButton.classList.remove('hidden');
      overlay.classList.add('active');
    }, 2000);
  }

  function resetGameState() {
    prizeCount["JUEGO DE BANDAS DE RESISTENCIA"] = 0;
    prizeCount["¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"] = 0;
    selectedSquares["JUEGO DE BANDAS DE RESISTENCIA"] = [];
    selectedSquares["¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"] = [];
    document.querySelectorAll('.square').forEach(square => {
      square.classList.remove('flipped', 'final-glow');
      square.style.opacity = "1";
      square.style.boxShadow = "";
    });
    congrats.classList.add('hidden');
    claimButton.classList.add('hidden');
    overlay.classList.remove('active');
  }

  function assignPhrases() {
    const shuffledPhrases = shuffleArray([...phrases]);
    const squares = document.querySelectorAll('.square .back span');
    squares.forEach((span, index) => {
      span.textContent = shuffledPhrases[index];
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
