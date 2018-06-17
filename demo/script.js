import { Carousel } from '../src/carousel.js';

const carousel = new Carousel(document.querySelector('.carousel'));

document
    .querySelector('.carousel-next')
    .addEventListener('click', () => carousel.goto('+1'));

document
    .querySelector('.carousel-prev')
    .addEventListener('click', () => carousel.goto('-1'));

document
    .querySelector('.carousel-prevpage')
    .addEventListener('click', () => carousel.goto('-100%'));

document
    .querySelector('.carousel-nextpage')
    .addEventListener('click', () => carousel.goto('+100%'));
