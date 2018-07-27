import Carousel from '../src/carousel.js';
import Player from '../src/player.js';

customElements.define('test-carousel', Carousel);

const expect = chai.expect;
const carousel = document.querySelector('test-carousel');
console.log(carousel);
mocha.setup('bdd');

describe('Carousel testing', function() {
    context('Init', function() {
        it('the container cannot have position static', function() {
            const position = getComputedStyle(carousel).position;
            expect(carousel).not.to.equal('static');
        });

        it('has horizontal scroll to 0', function() {
            expect(carousel.scrollLeft).to.equal(0);
            expect(carousel.scrollFromLeft).to.equal(0);
            expect(carousel.index).to.equal(0);
        });

        it('checks scroll status', function() {
            expect(carousel.scrollFromLeft === 0).to.be.true;
            expect(carousel.scrollFromRight === 0).to.be.false;
        });
    });

    context('Move', function() {
        //Disable smooth
        carousel.scrollBehavior = 'auto';

        it('goes to the end', function() {
            carousel.index = carousel.children.length - 1;

            expect(carousel.scrollFromLeft === 0).to.be.false;
            expect(carousel.scrollFromRight === 0).to.be.true;
            expect(carousel.index).to.equal(9);
        });

        it('moves -1', function() {
            carousel.index -= 1;

            expect(carousel.scrollFromLeft === 0).to.be.false;
            expect(carousel.scrollFromRight === 0).to.be.false;
            expect(carousel.index).to.equal(8);
            expect(carousel.scrollLeft).to.equal(3022);
        });

        it('moves +2', function() {
            carousel.index += 2;

            expect(carousel.scrollFromLeft === 0).to.be.false;
            expect(carousel.scrollFromRight === 0).to.be.true;
            expect(carousel.index).to.equal(9);
            expect(carousel.scrollLeft).to.equal(3400);
        });

        it('moves 0', function() {
            carousel.index = 0;

            expect(carousel.scrollFromLeft === 0).to.be.true;
            expect(carousel.scrollFromRight === 0).to.be.false;
            expect(carousel.index).to.equal(0);
            expect(carousel.scrollLeft).to.equal(0);
        });
    });

    context('Scroll', function() {
        //Disable smooth
        carousel.scrollBehavior = 'auto';

        it('goes to the beginning', function() {
            carousel.scrollFromLeft = 0;

            expect(carousel.scrollFromLeft === 0).to.be.true;
            expect(carousel.scrollFromRight === 0).to.be.false;
            expect(carousel.index).to.equal(0);
        });

        it('goes to the end', function() {
            carousel.scrollFromRight = 0;

            expect(carousel.scrollFromLeft === 0).to.be.false;
            expect(carousel.scrollFromRight === 0).to.be.true;
            expect(carousel.index).to.equal(9);
        });

        it('scroll from left', function() {
            carousel.scrollFromLeft = 400;

            expect(carousel.scrollFromLeft).to.equal(400);
            expect(carousel.scrollFromRight).to.equal(3000);
            expect(carousel.index).to.equal(1);
        });

        it('advance scroll from left', function() {
            carousel.scrollFromLeft += carousel.clientWidth;

            expect(carousel.scrollFromLeft).to.equal(1000);
            expect(carousel.scrollFromRight).to.equal(2400);
            expect(carousel.index).to.equal(3);
        });

        it('scroll from right', function() {
            carousel.scrollFromRight = 400;

            expect(carousel.scrollFromLeft).to.equal(3000);
            expect(carousel.scrollFromRight).to.equal(400);
            expect(carousel.index).to.equal(8);
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

        it('default step is 1', function() {
            expect(player.step).to.equal(1);
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
