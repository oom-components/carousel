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
                'Missing Scroll Snap Points support or not defined.'
            );
        }

        return support;
    }

    constructor(element) {
        Carousel.checkA11y(element);
        const support = Carousel.checkSupport(element);

        this.element = element;
        this.slides = Array.from(this.element.children);
        this.scrollOptions = {
            behavior: 'smooth'
        };

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
        const maxScroll = this.element.scrollWidth - this.element.clientWidth;
        const mark =
            this.element.clientWidth * (this.element.scrollLeft / maxScroll);

        return this.slides.find(slide => {
            const from = slide.offsetLeft - this.element.scrollLeft;
            const to = from + slide.clientWidth;

            if (mark >= from && mark <= to) {
                return slide;
            }
        });
    }

    goto(position) {
        const scroll = this.calculateScroll(position);

        try {
            this.element.scroll({
                left: scroll,
                behavior: this.scrollOptions.behavior
            });
        } catch (err) {
            this.element.scrollLeft = scroll;
        }
    }

    calculateScroll(position) {
        if (position === 'first') {
            return 0;
        }

        if (position === 'last') {
            return this.getSlideScroll(this.slides.length - 1);
        }

        if (position === 'current') {
            return this.getSlideScroll(this.slides.indexOf(this.current));
        }

        let index = this.slides.indexOf(this.current);

        if (/^\+[0-9]+$/.test(position)) {
            return this.getSlideScroll(
                index + parseInt(position.substr(1), 10)
            );
        }

        if (/^\-[0-9]+$/.test(position)) {
            return this.getSlideScroll(
                index - parseInt(position.substr(1), 10)
            );
        }

        return this.getSlideScroll(parseInt(position));
    }

    getSlideScroll(index) {
        if (index < 0) {
            index = 0;
        } else if (index >= this.slides.length) {
            index = this.slides.length - 1;
        }

        const percent = index / (this.slides.length - 1);
        const totalScroll = this.element.scrollWidth - this.element.clientWidth;
        return totalScroll * percent;
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

function getStyleValue(el, name) {
    const value = getComputedStyle(el)[name];

    if (value && value.replace(/none/g, '').trim()) {
        return value;
    }
}
