export default class Carousel {
    static checkA11y(element) {
        if (element.getAttribute('role') !== 'region') {
            console.info(
                '@oom/carusel [accesibility]:',
                'Missing role="region" attribute in the carousel element'
            );
        }

        if (!element.hasAttribute('aria-label')) {
            console.info(
                '@oom/carusel [accesibility]:',
                'Missing aria-label attribute in the carousel element'
            );
        }

        if (!element.hasAttribute('tabindex')) {
            console.info(
                '@oom/carusel [accesibility]:',
                'Missing tabindex="0" attribute in the carousel element'
            );
        }
    }

    static checkSupport(element) {
        const support = {
            smoothScroll: true,
            snapPoints: true
        };

        if (!('scroll' in element)) {
            support.smoothScroll = false;

            console.info(
                '@oom/carusel [compatibility]:',
                'Missing smooth scrolling support. Consider using a polyfill like "smoothscroll-polyfill"'
            );
        }

        if (
            !getStyleValue(element, 'scrollSnapType') ||
            !getStyleValue(element.firstElementChild, 'scrollSnapAlign')
        ) {
            support.snapPoints = false;

            console.info(
                '@oom/carusel [compatibility]:',
                'Missing Scroll Snap Points support or not defined in CSS.'
            );
        }

        return support;
    }

    constructor(element) {
        Carousel.checkA11y(element);
        const support = Carousel.checkSupport(element);

        this.element = element;
        this.slides = Array.from(this.element.children);
        this.scrollBehavior = 'smooth';

        //To calculate the offset of slides relative to the document
        if (getStyleValue(this.element, 'position') === 'static') {
            this.element.style.position = 'relative';
        }

        if (!support.snapPoints) {
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

                case 39: //right
                    this.goto('+1');
                    e.preventDefault();
                    break;
            }
        });
    }

    get current() {
        let currentPoint = 0;

        return this.slides.find((slide, index, slides) => {
            const nextPoint = this.getSlideScroll(index + 1);

            const limit = currentPoint + (nextPoint - currentPoint) / 2;

            if (this.element.scrollLeft <= limit) {
                return slide;
            }

            currentPoint = nextPoint;
        });
    }

    goto(position) {
        const index = this.getSlideIndex(position);
        const scroll = this.getSlideScroll(index);

        try {
            this.element.scroll({
                left: scroll,
                behavior: this.scrollBehavior
            });
        } catch (err) {
            this.element.scrollLeft = scroll;
        }
    }

    getSlideIndex(position) {
        if (position === 'first') {
            return 0;
        }

        if (position === 'last') {
            return this.slides.length - 1;
        }

        let index = this.slides.indexOf(this.current);

        if (position === 'current') {
            return index;
        }

        if (/^\+[0-9]+$/.test(position)) {
            index += parseInt(position.substr(1), 10);
        } else if (/^\-[0-9]+$/.test(position)) {
            index -= parseInt(position.substr(1), 10);
        } else {
            index = parseInt(position);
        }

        return Math.min(Math.max(index, 0), this.slides.length - 1);
    }

    getSlideScroll(index) {
        index = Math.min(Math.max(index, 0), this.slides.length - 1);

        const percent = index / (this.slides.length - 1);
        const slide = this.slides[index];
        const slidePosition = slide.clientWidth * percent + slide.offsetLeft;
        const elementPosition = this.element.clientWidth * percent;

        return slidePosition - elementPosition;
    }

    scrollIsAtTheBeginning() {
        return this.element.scrollLeft === 0;
    }

    scrollIsAtTheEnd() {
        return (
            this.element.scrollLeft >=
            this.element.scrollWidth - this.element.clientWidth
        );
    }
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

function getStyleValue(el, name) {
    const value = getComputedStyle(el)[name];

    if (value && value.replace(/none/g, '').trim()) {
        return value;
    }
}
