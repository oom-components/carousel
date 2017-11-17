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

let drag = false;
document.querySelector('.toggle-drag').addEventListener('click', () => {
    drag = !drag;

    if (drag) {
        carrousel.slide.start();
    } else {
        carrousel.slide.stop();
    }

    console.log('drag', drag);
});

carrousel.slide.start();
//carrousel.play();
