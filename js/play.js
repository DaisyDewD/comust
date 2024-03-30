const simbolosCartas = ['images/juego/fondofcarta1.png', 'images/juego/fondofcarta2.png', 'images/juego/fondofcarta3.png', 'images/juego/fondofcarta4.png', 'images/juego/fondofcarta5.png', 'images/juego/fondofcarta6.png', 'images/juego/fondofcarta7.png', 'images/juego/fondofcarta8.png'];

let cartas = [];
for (let i = 0; i < simbolosCartas.length; i++) {
    cartas.push(simbolosCartas[i]);
    cartas.push(simbolosCartas[i]);
}

function mezclarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const fondoCarta = 'images/juego/fondofcarta9.png';

function inicializarJuego() {
    cartas = mezclarCartas(cartas);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('div');
        carta.className = 'card';
        carta.style.backgroundImage = `url(${fondoCarta})`; // Establecer la imagen de reverso como fondo
        carta.dataset.symbol = cartas[i];
        carta.addEventListener('click', voltearCarta);
        gameContainer.appendChild(carta);
    }
}

function voltearCarta(event) {
    const carta = event.target;
    carta.style.backgroundImage = `url(${carta.dataset.symbol})`; // Cambiar la imagen de fondo para mostrar el símbolo
    carta.removeEventListener('click', voltearCarta);
    carta.classList.add('flipped');
    const cartasVolteadas = document.querySelectorAll('.flipped');
    if (cartasVolteadas.length === 2) {
        const [primeraCarta, segundaCarta] = cartasVolteadas;
        if (primeraCarta.dataset.symbol === segundaCarta.dataset.symbol) {
            primeraCarta.classList.remove('flipped');
            segundaCarta.classList.remove('flipped');
            primeraCarta.removeEventListener('click', voltearCarta);
            segundaCarta.removeEventListener('click', voltearCarta);
        } else {
            setTimeout(() => {
                cartasVolteadas.forEach(carta => {
                    carta.style.backgroundImage = `url(${fondoCarta})`; // Restablecer la imagen de reverso
                    carta.addEventListener('click', voltearCarta);
                    carta.classList.remove('flipped');
                });
            }, 1000);
        }
    }
}

function reiniciarJuego() {
    const cartasVolteadas = document.querySelectorAll('.flipped');
    cartasVolteadas.forEach(carta => {
        carta.style.backgroundImage = `url(${fondoCarta})`; // Restablecer la imagen de reverso
        carta.addEventListener('click', voltearCarta);
        carta.classList.remove('flipped');
    });
    setTimeout(() => {
        inicializarJuego();
    }, 500);
}

window.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});
