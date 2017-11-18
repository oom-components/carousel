require('pepjs');
require('smoothscroll-polyfill').polyfill();

import Carrousel from '../src';

const element = document.querySelector('.carrousel');

const carrousel = new Carrousel(element, {
    index: 0,
    hideScrollElement: element.parentElement
});

window.carrousel = carrousel;

document.querySelector('.carrousel-next').addEventListener('click', () => {
    carrousel.goto('+1');
    carrousel.player.stop();
});

document.querySelector('.carrousel-prev').addEventListener('click', () => {
    carrousel.goto('-1');
    carrousel.player.stop();
});

//carrousel.play();
