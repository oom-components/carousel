import Carousel from '../src/carousel.js';
import Player from '../src/player.js';

const carousel = new Carousel(document.querySelector('.carousel'));
const player = new Player(carousel);

document
    .querySelector('.carousel-next')
    .addEventListener('click', () => carousel.goto('+1'));

document
    .querySelector('.carousel-prev')
    .addEventListener('click', () => carousel.goto('-1'));

document
    .querySelector('.play-stop')
    .addEventListener(
        'click',
        () => (player.isPlaying ? player.stop() : player.play())
    );
