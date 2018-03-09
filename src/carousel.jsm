import Player from './player.jsm';

export default class Carousel {
    constructor(element) {
        if (!('scroll' in Element.prototype)) {
            console.log(
                '[pw-carusel]: Missing Element.prototype.scroll. Consider using a polyfill'
            );
        }

        this.element = element;
        this.slides = this.element.children;

        //To calculate the offset of slides relative to the document
        if (getStyle(this.element, 'position') === 'static') {
            this.element.style.position = 'relative';
        }

        if (!scrollSnapSupported(this.element)) {
            this.goto('current');

            this.element.addEventListener(
                'scroll',
                debounce(() => this.goto('current'), 100)
            );

            window.addEventListener(
                'resize',
                debounce(() => this.goto('current'), 100)
            );
        }

        this.element.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37: //left
                    this.goto('-1');
                    e.preventDefault();
                    break;

                case 39: //left
                    this.goto('+1');
                    e.preventDefault();
                    break;
            }
        });
    }

    get current() {
        for (let i in this.slides) {
            const slide = this.slides[i];
            const range = slide.offsetLeft + slide.offsetWidth / 3;

            if (range >= this.element.scrollLeft) {
                return slide;
            }
        }
    }

    get player() {
        if (!this._player) {
            this._player = new Player(this);
        }

        return this._player;
    }

    goto(position) {
        const slide = this.getSlide(position);

        if (slide) {
            try {
                this.element.scroll({
                    left: slide.offsetLeft,
                    behavior: 'smooth'
                });
            } catch (err) {
                this.element.scrollLeft = slide.offsetLeft;
            }
        }
    }

    getSlide(position) {
        if (Array.prototype.indexOf.call(this.slides, position) !== -1) {
            return position;
        }

        if (position === undefined || position === 'current') {
            return this.current;
        }

        if (position === 'first') {
            return this.slides[0];
        }

        if (position === 'last') {
            return this.slides[this.slides.length - 1];
        }

        let index = Array.prototype.indexOf.call(this.slides, this.current);

        if (typeof position === 'string') {
            if (/^\+[0-9]+$/.test(position)) {
                index += parseInt(position.substr(1), 10);
            } else if (/^\-[0-9]+$/.test(position)) {
                index -= parseInt(position.substr(1), 10);
            } else {
                index = parseInt(position);
            }
        }

        if (index < 0) {
            return this.getSlide('first');
        }

        if (index >= this.slides.length) {
            return this.slides[this.slides.length - 1];
        }

        return this.slides[index];
    }
}

//Check support for CSS scroll snap points
function scrollSnapSupported(el) {
    //Old spec
    const value = getStyle(el, 'scrollSnapPointsX');

    if (value) {
        return isNotNone(value);
    }

    //New spec
    if (
        isNotNone(getStyle(el, 'scrollSnapType')) &&
        isNotNone(getStyle(el.firstElementChild, 'scrollSnapAlign'))
    ) {
        return true;
    }

    return false;
}

function debounce(fn, wait) {
    let timeout;

    return function() {
        const later = function() {
            timeout = null;
            fn();
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getStyle(el, name) {
    const style = getComputedStyle(el);

    if (name in style) {
        return style[name];
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);
    const prefixes = ['Moz', 'Webkit', 'O', 'ms'];

    for (var i = 0; i < prefixes.length; i++) {
        let prop = prefixes[i] + name;

        if (prop in style) {
            return style[prop];
        }
    }
}

function isNotNone(value) {
    return value && value.replace(/none/g, '').trim();
}
