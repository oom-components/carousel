import Carrousel from '../src';

const carrousel = new Carrousel(
	document.querySelector('.carrousel'),
	{
		fitToLimits: true
	}
);

document.querySelector('.carrousel-next').addEventListener('click', function () {
	carrousel.goTo('+1');
	carrousel.stop();
});

document.querySelector('.carrousel-prev').addEventListener('click', function () {
	carrousel.goTo('-1');
	carrousel.stop();
});

carrousel.play();