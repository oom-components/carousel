import d from 'd_js';
import Player from './Player';
import debounce from 'lodash.debounce';

export default class Carrousel {
    constructor(element, settings = {}) {
        if (!('scroll' in Element.prototype)) {
            console.log(
                '[pw-carrusel]: Missing Element.prototype.scroll. Consider using a polyfill'
            );
        }

        this.element = element;
        this.tray = element.firstElementChild;
        this.slides = Array.prototype.slice.call(this.tray.children);
        this.index = settings.index || 0;
        this.hideScrollElement = settings.hideScrollElement;

        if (this.hideScrollElement) {
            this.hideScrollElement.style.overflow = 'hidden';
        }

        this.goto(this.index);
        this.refresh();

        //Refresh on scroll and resize
        this.element.addEventListener(
            'scroll',
            debounce(() => this.refresh(), 100)
        );
        window.addEventListener('resize', debounce(() => this.refresh(), 100));

        //Remove scroll
        if (this.hideScrollElement) {
            window.addEventListener('load', e => {
                this.element.style.marginBottom = `-${this.element
                    .offsetHeight - this.element.clientHeight}px`;
            });
        }
    }

    get player() {
        if (!this._player) {
            this._player = new Player(this);
        }

        return this._player;
    }

    goto(position) {
        const index = this.getIndex(position);

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
            x +=
                parseInt(trayStyle.paddingLeft) +
                parseInt(trayStyle.marginLeft) +
                parseInt(trayStyle.borderLeftWidth);
        }

        x = Math.min(x, this.element.scrollWidth - this.element.clientWidth);

        if (x === this.element.scrollLeft && index > this.index) {
            return;
        }

        this.index = index;

        if (this.element.scroll) {
            this.element.scroll({
                left: x,
                behavior: 'smooth'
            });
        } else {
            this.element.scrollLeft = x;
        }
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

    refresh() {
        const el = this.element;
        const x = el.scrollLeft;

        if (
            el.scrollLeft + el.getBoundingClientRect().width ===
            el.scrollWidth
        ) {
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

            if (left - slide.offsetWidth / 2 > x) {
                break;
            }

            ++index;
        }

        if (left !== x) {
            this.goto(index);
        }

        if (this.hideScrollElement) {
            el.style.marginBottom = `-${el.offsetHeight - el.clientHeight}px`;
        }
    }
}
