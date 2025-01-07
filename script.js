document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "JUEGO DE BANDAS DE RESISTENCIA",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!",
    "¡50% DE DESCUENTO EN TU PRÓXIMO PEDIDO!"
  ];

  // Barajar y asignar frases
  shuffleArray(phrases);
  document.querySelectorAll('.square .back span').forEach((span, index) => {
    span.textContent = phrases[index];
  });

  // Añadir eventos a las casillas
  document.querySelectorAll('.square').forEach(square => {
    square.addEventListener('click', () => startCountdown(square));
  });

  // Evento para redirigir al pulsar "Reclama tu regalo"
  const claimButton = document.getElementById('claim-button');
  claimButton.addEventListener('click', () => {
    window.location.href = "https://www.powerhands.es/minijuego-regalo-no-visible";
  });
});

// Iniciar la cuenta atrás
function startCountdown(clickedSquare) {
  const countdown = document.getElementById('countdown');
  resetGameState(countdown);

  let time = 3;
  countdown.textContent = time;
  countdown.classList.remove('hidden');

  // Cuenta atrás
  countdown.interval = setInterval(() => {
    time--;
    if (time > 0) {
      countdown.textContent = time;
    } else {
      clearInterval(countdown.interval);
      countdown.classList.add('hidden');
      showCongrats(clickedSquare);
    }
  }, 1000);
}

// Mostrar mensaje de enhorabuena
function showCongrats(clickedSquare) {
  const congrats = document.getElementById('congrats');
  const claimButton = document.getElementById('claim-button');
  const overlay = document.getElementById('overlay');

  congrats.classList.remove('hidden');
  clickedSquare.classList.add('flipped');

  setTimeout(() => {
    congrats.classList.add('hidden');
    claimButton.classList.remove('hidden');
    overlay.classList.add('active');
    disableSquareClicks();
  }, 5000);
}

// Deshabilitar clics en casillas
function disableSquareClicks() {
  document.querySelectorAll('.square').forEach(square => {
    square.replaceWith(square.cloneNode(true));
  });
}

// Restablecer el estado inicial
function resetGameState(countdown) {
  clearInterval(countdown.interval);
  document.querySelectorAll('.square').forEach(square => square.classList.remove('flipped'));
  document.getElementById('congrats').classList.add('hidden');
  document.getElementById('claim-button').classList.add('hidden');
  document.getElementById('overlay').classList.remove('active');
}

// Barajar un array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Evitar interacciones en el overlay
document.getElementById('overlay').addEventListener('click', (event) => {
  event.stopPropagation();
});
