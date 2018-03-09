require('smoothscroll-polyfill').polyfill();

import Carousel from '../src/carousel.jsm';

const element = document.querySelector('.carousel');

const carousel = new Carousel(element, {
    snap: 'auto'
});

window.carousel = carousel;

document.querySelector('.carousel-next').addEventListener('click', () => {
    carousel.goto('+1');
    carousel.player.stop();
});

document.querySelector('.carousel-prev').addEventListener('click', () => {
    carousel.goto('-1');
    carousel.player.stop();
});

//carousel.player.play();
