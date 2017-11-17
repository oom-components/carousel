import d from 'd_js';
import Slide from './Slide';
import Player from './Player';

export default class Carrousel {
    constructor(element, settings = {}) {
        this.element = element;
        this.tray = element.firstElementChild;
        this.slides = Array.prototype.slice.call(this.tray.children);
        this.index = settings.index || 0;

        this.move(this.index);
        this.slide = new Slide(this);

        let scrollTimeout;

        this.element.addEventListener('scroll', e => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                this.refresh();
            }, 100);
        });
    }

    move(position) {
        const el = this.element;
        const index = this.getIndex(position);
        const x = this.slides.slice(0, index).reduce((x, slide) => {
            const style = getComputedStyle(slide);
            return (
                x +
                slide.offsetWidth +
                parseInt(style.marginLeft) +
                parseInt(style.marginRight)
            );
        }, 0);

        if (x > el.scrollLeft && el.scrollLeft + el.getBoundingClientRect().width === el.scrollWidth) {
            return;
        }

        this.index = index;

        el.scroll({
            left: x,
            behavior: 'smooth'
        });
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
        if (!this.player) {
            this.player = new Player(this);
        }

        this.player.play(interval);
    }

    stop() {
        if (this.player) {
            this.player.stop();
        }
    }

    refresh() {
        const el = this.element;
        const x = el.scrollLeft;

        if (el.scrollLeft + el.getBoundingClientRect().width === el.scrollWidth) {
            return;
        }

        let left = 0;
        let index = 0;

        while (this.slides[index]) {
            const slide = this.slides[index];
            const style = getComputedStyle(slide);
            left +=
                slide.offsetWidth +
                parseInt(style.marginLeft) +
                parseInt(style.marginRight);

            if (left - (slide.offsetWidth / 2) > x) {
                break;
            }

            ++index;
        }

        if (left !== x) {
            this.move(index);
        }

        return index;
    }

    destroy() {
        this.stop();
        this.drag(false);
        this.move(0);
        d.css(this.element, 'overflow-x', 'auto');
    }
}
