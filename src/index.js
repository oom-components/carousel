import d from 'd_js';
import Unidragger from 'unidragger';

class Dragger extends Unidragger {
    constructor(carrousel) {
        super();
        this.carrousel = carrousel;
        this.handles = [carrousel.tray];
        this.bindHandles();
    }

    dragStart(event, pointer) {
        this.x = this.carrousel.x;
        this.transition = d.css(this.carrousel.tray, 'transition');
        this.limits = this.carrousel.getLimits();
        d.css(this.carrousel.tray, 'transition', 'none');
    }

    dragMove(event, pointer, moveVector) {
        const x = this.x + moveVector.x;

        if (x < this.limits[0] && x > this.limits[1]) {
            this.carrousel.translateX(x);
        }
    }

    dragEnd(event, pointer) {
        d.css(this.carrousel.tray, 'transition', this.transition);
        this.carrousel.refresh();
    }
}

class Player {
    constructor(carrousel) {
        this.carrousel = carrousel;
        this.interval = 5000;
        this.direction = '+1';
        this.lastIndex = 0;
        this.isPlaying = false;
        this.snap = false;
    }

    play(interval) {
        this.interval = interval || this.interval;

        const go = () => {
            let index = this.carrousel.getIndex(this.direction);

            if (index === this.lastIndex) {
                this.direction = this.direction === '+1' ? '-1' : '+1';
                index = this.carrousel.getIndex(this.direction);
            }

            this.carrousel.move(index);
            this.lastIndex = index;
        };

        this.isPlaying = true;
        this.timeout = setTimeout(go, this.interval);
    }

    stop() {
        clearInterval(this.timeout);
        this.isPlaying = false;
    }

    restart() {
        this.stop();
        this.play();
    }
}

export default class Carrousel {
    constructor(element, settings) {
        settings = settings || {};
        d.css(element, 'overflow-x', 'hidden');

        this.element = element;
        this.tray = element.firstElementChild;
        this.slides = d.getAll(this.tray.children);

        this.offset = settings.offset || 0;
        this.fitToLimits = settings.fitToLimits || false;
        this.index = settings.index || 0;

        this.dragger = new Dragger(this);
        this.player = new Player(this);

        this.move(this.index);
    }

    move(position) {
        const index = this.getIndex(position);
        const limits = this.getLimits();

        let x = this.slides.slice(0, index).reduce((x, slide) => {
            const style = getComputedStyle(slide);
            return (
                x -
                slide.offsetWidth +
                parseInt(style.marginLeft) +
                parseInt(style.marginRight)
            );
        }, 0);

        if (x > limits[0]) {
            x = limits[0];
        } else if (x < limits[1]) {
            x = limits[1];
        } else {
            this.index = index;
        }

        this.translateX(x);
    }

    getLimits() {
        let min = 0;
        let max = this.tray.scrollWidth * -1 + this.element.offsetWidth;

        if (!this.fitToLimits) {
            if (this.offset === 'center') {
                min +=
                    (this.element.offsetWidth - this.slides[0].offsetWidth) / 2;
                max -=
                    (this.element.offsetWidth -
                        this.slides[this.slides.length - 1].offsetWidth) /
                    2;
            } else {
                min += this.offset || 0;
                max += this.offset || 0;
            }
        }

        return [min, max];
    }

    getIndex(position) {
        if (position === undefined || position === 'current') {
            return this.index;
        }

        if (position === 'first') {
            return 0;
        }

        if (position === 'last') {
            return this.slides.length - 1;
        }

        if (typeof position === 'string') {
            if (/^\+[0-9]+$/.test(position)) {
                position = this.index + parseInt(position.substr(1), 10);
            } else if (/^\-[0-9]+$/.test(position)) {
                position = this.index - parseInt(position.substr(1), 10);
            } else {
                position = parseInt(position);
            }
        }

        if (position < 0) {
            return 0;
        }

        if (position >= this.slides.length) {
            return this.slides.length - 1;
        }

        return position;
    }

    play(interval) {
        this.player.play(interval);
    }

    stop() {
        this.player.stop();
    }

    translateX(x) {
        this.x = x;
        d.css(this.tray, 'transform', 'translateX(' + x + 'px)');

        if (this.player.isPlaying) {
            this.player.restart();
        }
    }

    refresh() {
        const x = this.x;
        let indexX = 0;
        let index = 0;

        while (this.slides[index]) {
            const slide = this.slides[index];
            const style = getComputedStyle(slide);
            indexX -= slide.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);

            if ((indexX + (slide.offsetWidth / 2)) < x) {
                break;
            }

            ++index;
        }

        if (indexX !== x) {
            this.move(index);
        }

        return index;
    }
}
