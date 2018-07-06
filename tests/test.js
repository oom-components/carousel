import Carousel from '../src/carousel.js';
import Player from '../src/player.js';

const expect = chai.expect;
const element = document.getElementById('carousel');
const carousel = new Carousel(element);

mocha.setup('bdd');

describe('Carousel testing', function() {
    context('Init', function() {
        it('should save a reference of the container', function() {
            expect(carousel.element).to.equal(element);
        });

        it('should save a reference of the slides', function() {
            expect(carousel.slides.length).to.equal(10);
            expect(carousel.slides[0]).to.equal(element.firstElementChild);
            expect(carousel.slides[9]).to.equal(element.lastElementChild);
        });

        it('the container cannot have position static', function() {
            const position = getComputedStyle(element).position;
            expect(position).to.equal('relative');
        });

        it('has horizontal scroll to 0', function() {
            expect(element.scrollLeft).to.equal(0);
            expect(carousel.current).to.equal(carousel.slides[0]);
        });

        it('returns slides properly', function() {
            expect(carousel.current).to.equal(carousel.slides[0]);
            expect(carousel.getSlideIndex('first')).to.equal(0);
            expect(carousel.getSlideIndex('last')).to.equal(9);
            expect(carousel.getSlideScroll(0)).to.equal(0);
            expect(carousel.getSlideScroll(9)).to.equal(3400);
        });

        it('checks scroll status', function() {
            expect(carousel.scrollIsAtTheBeginning()).to.be.true;
            expect(carousel.scrollIsAtTheEnd()).to.be.false;
        });
    });

    context('Move', function() {
        //Disable smooth
        carousel.scrollBehavior = 'auto';

        it('goes to the end', function() {
            carousel.goto('last');
            expect(carousel.scrollIsAtTheBeginning()).to.be.false;
            expect(carousel.scrollIsAtTheEnd()).to.be.true;
            expect(carousel.current).to.equal(element.lastElementChild);
        });

        it('moves -1', function() {
            carousel.goto('-1');
            expect(carousel.scrollIsAtTheBeginning()).to.be.false;
            expect(carousel.scrollIsAtTheEnd()).to.be.false;
            expect(carousel.current).to.equal(carousel.slides[8]);
            expect(element.scrollLeft).to.equal(3022);
        });

        it('moves +2', function() {
            carousel.goto('+2');
            expect(carousel.scrollIsAtTheBeginning()).to.be.false;
            expect(carousel.scrollIsAtTheEnd()).to.be.true;
            expect(carousel.current).to.equal(carousel.slides[9]);
            expect(element.scrollLeft).to.equal(3400);
        });

        it('moves 0', function() {
            carousel.goto('0');
            expect(carousel.scrollIsAtTheBeginning()).to.be.true;
            expect(carousel.scrollIsAtTheEnd()).to.be.false;
            expect(carousel.current).to.equal(carousel.slides[0]);
            expect(element.scrollLeft).to.equal(0);
        });
    });

    context('Player', function() {
        const player = new Player(carousel);

        it('default interval is 5000ms', function() {
            expect(player.interval).to.equal(5000);
        });

        it('does not playing', function() {
            expect(player.isPlaying).to.be.false;
        });

        it('default direction is +1', function() {
            expect(player.direction).to.equal('+1');
        });

        it('status is playing', function() {
            player.play();
            expect(player.isPlaying).to.be.true;
        });

        it('status is stopped', function() {
            player.stop();
            expect(player.isPlaying).to.be.false;
        });
    });
});

mocha.run();
