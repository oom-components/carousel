export default class Carousel {
    static checkElement(element) {
        if (!('scroll' in element) || !('scrollBehavior' in element.style)) {
            console.info(
                '@oom/carusel [compatibility]:',
                'Missing smooth scrolling support. Consider using a polyfill like "smoothscroll-polyfill"'
            );
        }

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

    constructor(element) {
        Carousel.checkElement(element);

        this.element = element;
        this.slides = this.element.children;
        this.scrollOptions = {
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
        };

        //To calculate the offset of slides relative to the document
        if (getStyle(this.element, 'position') === 'static') {
            this.element.style.position = 'relative';
        }

        if (!scrollSnapSupported(this.element)) {
            this.goto('current');

            this.element.addEventListener(
                'scroll',
                debounce(() => {
                    if (
                        !this.scrollIsAtTheBeginning() &&
                        !this.scrollIsAtTheEnd()
                    ) {
                        this.goto('current');
                    }
                }, 100)
            );

            window.addEventListener(
                'resize',
                debounce(() => {
                    if (
                        !this.scrollIsAtTheBeginning() &&
                        !this.scrollIsAtTheEnd()
                    ) {
                        this.goto('current');
                    }
                }, 100)
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
        return calculateSlide(this.slides, this.element);
    }

    goto(position) {
        const slide = this.getSlide(position);

        if (slide) {
            try {
                slide.scrollIntoView(this.scrollOptions);
            } catch (err) {
                this.element.scrollLeft = getCenter(slide, this.element);
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

        //Percentage
        if (typeof position === 'string') {
            if (/^\+[0-9]+%$/.test(position)) {
                return calculateSlide(
                    this.slides,
                    this.element,
                    this.element.scrollLeft +
                        calculatePercentage(this.element, position)
                );
            }

            if (/^\-[0-9]+%$/.test(position)) {
                return calculateSlide(
                    this.slides,
                    this.element,
                    this.element.scrollLeft -
                        calculatePercentage(this.element, position)
                );
            }

            if (/^\[0-9]+%$/.test(position)) {
                return calculateSlide(
                    this.slides,
                    this.element,
                    calculatePercentage(this.element, position)
                );
            }
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

function getCenter(slide, element) {
    return slide.offsetLeft + (slide.clientWidth / 2 - element.clientWidth / 2);
}

function calculateSlide(slides, element, scrollLeft = element.scrollLeft) {
    if (scrollLeft < 0) {
        return slides[0];
    }

    if (scrollLeft > element.scrollWidth - element.clientWidth) {
        return slides[slides.length - 1];
    }

    for (let i in slides) {
        const slide = slides[i];
        const range = getCenter(slide, element) + slide.offsetWidth / 3;

        if (range >= scrollLeft) {
            return slide;
        }
    }
}

function calculatePercentage(element, percentage) {
    return (element.clientWidth / 100) * parseInt(percentage.slice(1, -1), 10);
}
