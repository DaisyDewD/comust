// Definimos los símbolos de las cartas
const simbolosCartas = ['images/juego/fondocarta1.png', '🌺', '🌻', '🌼', '🌷', '💐', '🌹', '🏵️'];

// Creamos una matriz con las cartas y sus respectivos pares
let cartas = [];
for (let i = 0; i < simbolosCartas.length; i++) {
    cartas.push(simbolosCartas[i]);
    cartas.push(simbolosCartas[i]);
}

// Función para mezclar el orden de las cartas
function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para inicializar el juego
function inicializarJuego() {
    cartas = mezclarCartas(cartas);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('div');
        carta.className = 'card';
        carta.dataset.symbol = cartas[i];
        carta.textContent = '?';
        carta.addEventListener('click', voltearCarta);
        gameContainer.appendChild(carta);
    }
}

// Función para voltear una carta
function voltearCarta(event) {
    const carta = event.target;
    carta.textContent = carta.dataset.symbol;
    carta.removeEventListener('click', voltearCarta);
    carta.classList.add('flipped');
    const cartasVolteadas = document.querySelectorAll('.flipped');
    if (cartasVolteadas.length === 2) {
        const [primeraCarta, segundaCarta] = cartasVolteadas;
        if (primeraCarta.dataset.symbol === segundaCarta.dataset.symbol) {
            // Si las cartas son iguales, las dejamos volteadas
            primeraCarta.classList.remove('flipped');
            segundaCarta.classList.remove('flipped');
            primeraCarta.removeEventListener('click', voltearCarta);
            segundaCarta.removeEventListener('click', voltearCarta);
        } else {
            // Si las cartas son diferentes, las volvemos a esconder
            setTimeout(() => {
                primeraCarta.textContent = '?';
                segundaCarta.textContent = '?';
                primeraCarta.addEventListener('click', voltearCarta);
                segundaCarta.addEventListener('click', voltearCarta);
                primeraCarta.classList.remove('flipped');
                segundaCarta.classList.remove('flipped');
            }, 1000);
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    const cartasVolteadas = document.querySelectorAll('.flipped');
    cartasVolteadas.forEach(carta => {
        carta.textContent = '?';
        carta.addEventListener('click', voltearCarta);
        carta.classList.remove('flipped');
    });
    setTimeout(() => {
        inicializarJuego();
    }, 500);
}

// Inicializamos el juego al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});
