import Carrousel from '../src';

const carrousel = new Carrousel(document.querySelector('.carrousel'), {
    fitToLimits: true
});

document.querySelector('.carrousel-next').addEventListener('click', () => {
    carrousel.move('+1');
    carrousel.stop();
});

document.querySelector('.carrousel-prev').addEventListener('click', () => {
    carrousel.move('-1');
    carrousel.stop();
});

carrousel.drag(true);
carrousel.play();
