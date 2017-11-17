require('pepjs');
require('smoothscroll-polyfill');

import Carrousel from '../src';

const carrousel = new Carrousel(document.querySelector('.carrousel'), {
    fitToLimits: true
});

window.carrousel = carrousel;

document.querySelector('.carrousel-next').addEventListener('click', () => {
    carrousel.move('+1');
    carrousel.stop();
});

document.querySelector('.carrousel-prev').addEventListener('click', () => {
    carrousel.move('-1');
    carrousel.stop();
});

//carrousel.play();
