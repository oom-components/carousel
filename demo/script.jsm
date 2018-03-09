import Carousel from '../src/carousel.jsm';

const carousel = new Carousel(document.querySelector('.carousel'));

document
    .querySelector('.carousel-next')
    .addEventListener('click', () => carousel.goto('+1'));

document
    .querySelector('.carousel-prev')
    .addEventListener('click', () => carousel.goto('-1'));
