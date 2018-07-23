import Carousel from '../src/carousel.js';
import Player from '../src/player.js';

customElements.define('oom-carousel', Carousel);

const carousel = document.querySelector('oom-carousel');
const player = new Player(carousel);

document
    .querySelector('.carousel-next')
    .addEventListener('click', () => (carousel.index += 1));

document
    .querySelector('.carousel-prev')
    .addEventListener('click', () => (carousel.index -= 1));

document
    .querySelector('.play-stop')
    .addEventListener(
        'click',
        () => (player.isPlaying ? player.stop() : player.play())
    );
