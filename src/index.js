import d from 'd_js';
import Slider from './Slider';
import Player from './Player';

export default class Carrousel {
    constructor(element, settings = {}) {
        this.element = element;
        this.tray = element.firstElementChild;
        this.slides = Array.prototype.slice.call(this.tray.children);
        this.index = settings.index || 0;

        this.move(this.index);

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

        d.css(this.element, 'overflow-x', 'auto');

        const fn = e => {
            if (!getScrollSize()) {
                d.css(this.element, 'overflow-x', 'auto');
            } else {
                d.css(this.element, 'overflow-x', 'hidden');
                this.slider = new Slider(this);
            }

            this.element.removeEventListener('touchstart', fn, false);
        };

        this.element.addEventListener('touchstart', fn);
    }

    move(position) {
        const index = this.getIndex(position);

        if (index === this.index) {
            return;
        }

        let x = this.slides.slice(0, index).reduce((x, slide) => {
            const style = getComputedStyle(slide);
            return (
                x +
                slide.getBoundingClientRect().width +
                parseInt(style.marginLeft) +
                parseInt(style.marginRight)
            );
        }, 0);

        if (position !== 0) {
            const trayStyle = getComputedStyle(this.tray);
            x += parseInt(trayStyle.paddingLeft) + parseInt(trayStyle.marginLeft) + parseInt(trayStyle.borderLeftWidth);
        }

        x = Math.min(x, this.element.scrollWidth - this.element.clientWidth);

        if (x === this.element.scrollLeft && index > this.index) {
            return;
        }

        this.index = index;

        this.element.scroll({
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

        if (this.slider) {
            this.slider.stop();
        }

        d.css(this.element, 'overflow-x', 'auto');
    }
}

/**
 * Returns the width of the scroll
 */
function getScrollSize() {
    const div = document.createElement('div');
    d.css(div, {
        width: '100px',
        height: '100px',
        overflow: 'scroll',
        position: 'absolute',
        top: '-999px'
    });

    document.body.append(div);
    const width = div.offsetWidth - div.clientWidth;
    div.remove();

    return width;
}
