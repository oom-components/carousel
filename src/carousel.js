export default class Carousel extends HTMLElement {
    static get observedAttributes() {
        return ['index'];
    }

    constructor() {
        super();
        this.scrollBehavior = 'smooth';

        //To calculate the offset of slides relative to the document
        if (getStyleValue(this, 'position') === 'static') {
            this.style.position = 'relative';
        }

        this.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 37: //left
                    this.index -= 1;
                    e.preventDefault();
                    break;

                case 39: //right
                    this.index += 1;
                    e.preventDefault();
                    break;
            }
        });

        checkScrollSupport(this);
        checkA11y(this);

        if (!supportSnapPoints(this)) {
            this.addEventListener(
                'scroll',
                debounce(() => (this.index += 0), 100)
            );
        }
    }

    get index() {
        let currentPoint = 0;

        return Array.from(this.children).findIndex((slide, index) => {
            const nextPoint = getSlideScroll(this, index + 1);

            const limit = currentPoint + (nextPoint - currentPoint) / 2;

            if (this.scrollLeft <= limit) {
                return slide;
            }

            currentPoint = nextPoint;
        });
    }

    set index(index) {
        if (typeof index !== 'number' || Math.round(index) !== index) {
            throw new Error('Invalid index value. It must be an integer');
        }

        const scroll = getSlideScroll(this, index);

        try {
            this.scroll({
                left: scroll,
                behavior: this.scrollBehavior
            });
        } catch (err) {
            this.scrollLeft = scroll;
        }
    }

    get scrollFromLeft() {
        return this.scrollLeft;
    }

    get scrollFromRight() {
        return this.scrollWidth - this.clientWidth - this.scrollLeft;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.index = parseInt(newValue);
        }
    }
}

function getSlideScroll(element, index) {
    const slides = element.children;

    index = Math.min(Math.max(index, 0), slides.length - 1);

    const percent = index / (slides.length - 1);
    const slide = slides[index];
    const slidePosition = slide.clientWidth * percent + slide.offsetLeft;
    const elementPosition = element.clientWidth * percent;

    return slidePosition - elementPosition;
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

function supportSnapPoints(element) {
    const support =
        getStyleValue(element, 'scrollSnapType') &&
        getStyleValue(element.firstElementChild, 'scrollSnapAlign');

    if (!support) {
        console.info(
            '@oom/carusel [compatibility]:',
            'Missing Scroll Snap Points support or not defined in CSS.'
        );
    }

    return support;
}

function checkScrollSupport(element) {
    const support = 'scroll' in element && 'scrollBehavior' in element.style;

    if (!support) {
        console.info(
            '@oom/carusel [compatibility]:',
            'Missing smooth scrolling support. Consider using a polyfill like "smoothscroll-polyfill"'
        );
    }
}

function checkA11y(element) {
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
