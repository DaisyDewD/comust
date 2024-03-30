const simbolosCartas = ['images/juego/fondofcarta1.png', 'images/juego/fondofcarta2.png', 'images/juego/fondofcarta3.png', 'images/juego/fondofcarta4.png', 'images/juego/fondofcarta5.png', 'images/juego/fondofcarta6.png', 'images/juego/fondofcarta7.png', 'images/juego/fondofcarta8.png'];

const caracteresCodigo = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

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
let aciertos = 0;

let tiempoIniciado = false; 

function inicializarJuego() {
    aciertos = 0;
    cartas = mezclarCartas(cartas);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    for (let i = 0; i < cartas.length; i++) {
        const carta = document.createElement('div');
        carta.className = 'card';
        carta.style.backgroundImage = `url(${fondoCarta})`;
        carta.dataset.symbol = cartas[i];
        carta.addEventListener('click', voltearCarta);
        gameContainer.appendChild(carta);
    }
}

function iniciarTiempo() {
    if (!tiempoIniciado) {
        tiempoIniciado = true;
        setTimeout(() => {
            terminarJuego();
        }, 10000);
    }
}

function voltearCarta(event) {
    iniciarTiempo(); 
    const carta = event.target;
    carta.style.backgroundImage = `url(${carta.dataset.symbol})`; 
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
            aciertos++;
        } else {
            setTimeout(() => {
                cartasVolteadas.forEach(carta => {
                    carta.style.backgroundImage = `url(${fondoCarta})`; 
                    carta.addEventListener('click', voltearCarta);
                    carta.classList.remove('flipped');
                });
            }, 1000);
        }
    }
}

function reiniciarJuego() {
    tiempoIniciado = false; 
    const cartasVolteadas = document.querySelectorAll('.flipped');
    cartasVolteadas.forEach(carta => {
        carta.style.backgroundImage = `url(${fondoCarta})`; 
        carta.addEventListener('click', voltearCarta);
        carta.classList.remove('flipped');
    });
    const codigoDescuentoDiv = document.getElementById('codigo-descuento');
    codigoDescuentoDiv.textContent = ''; // Borra el contenido del elemento
    setTimeout(() => {
        inicializarJuego();
    }, 500);
}

function terminarJuego() {
    let descuento = '';

    if (aciertos >= 10) {
        descuento = '20%';
    } else if (aciertos >= 7) {
        descuento = '15%';
    } else if (aciertos >= 5) {
        descuento = '10%';
    } else {
        descuento = '5%';
    }

    const codigoGenerado = generarCodigo();
    mostrarCodigoDescuento(codigoGenerado, descuento);
}

function generarCodigo() {
    let codigo = '';
    for (let i = 0; i < 6; i++) {
        codigo += caracteresCodigo.charAt(Math.floor(Math.random() * caracteresCodigo.length));
    }
    return codigo;
}

function mostrarCodigoDescuento(codigo, descuento) {
    const codigoDescuentoDiv = document.getElementById('codigo-descuento');
    codigoDescuentoDiv.textContent = `Tu código de descuento único es: ${codigo}${descuento}. Presenta esta captura el día del evento.`;
}

window.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});
