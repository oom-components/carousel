export default class Carousel extends HTMLElement {
    static get observedAttributes() {
        return ['index'];
    }

    constructor() {
        super();
        this.scrollBehavior = 'smooth';
    }

    connectedCallback() {
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
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'index') {
            this.index = parseInt(newValue);
        }
    }

    next(amount = 1) {
        this.scrollFromLeft += this.clientWidth * amount;
    }

    prev(amount = 1) {
        this.scrollFromLeft -= this.clientWidth * amount;
    }

    get index() {
        const total = this.children.length - 1;

        for (let index = 0; index < total; index++) {
            const scroll = getSlideScroll(this, index);

            if (this.scrollLeft <= scroll) {
                return index;
            }
        }

        return total;
    }

    set index(index) {
        if (typeof index !== 'number' || Math.round(index) !== index) {
            throw new Error('Invalid index value. It must be an integer');
        }

        this.scrollFromLeft = getSlideScroll(this, index);
    }

    get scrollFromLeft() {
        return this.scrollLeft;
    }

    set scrollFromLeft(scroll) {
        try {
            this.scroll({
                left: scroll,
                behavior: this.scrollBehavior
            });
        } catch (err) {
            this.scrollLeft = scroll;
        }
    }

    get scrollFromRight() {
        return this.scrollWidth - this.clientWidth - this.scrollLeft;
    }

    set scrollFromRight(scroll) {
        this.scrollFromLeft = this.scrollWidth - this.clientWidth - scroll;
    }
}

function getSlideScroll(element, index) {
    const slides = element.children;
    index = Math.min(Math.max(index, 0), slides.length - 1);
    const slide = slides[index];
    const scroll = Math.round(slide.offsetLeft - element.clientWidth / 2 + slide.clientWidth / 2);

    return Math.max(scroll, 0);
}

function getStyleValue(el, name) {
    const value = getComputedStyle(el)[name];

    if (value && value.replace(/none/g, '').trim()) {
        return value;
    }
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
        console.info('@oom/carusel [accesibility]:', 'Missing role="region" attribute in the carousel element');
    }

    if (!element.hasAttribute('aria-label')) {
        console.info('@oom/carusel [accesibility]:', 'Missing aria-label attribute in the carousel element');
    }

    if (!element.hasAttribute('tabindex')) {
        console.info('@oom/carusel [accesibility]:', 'Missing tabindex="0" attribute in the carousel element');
    }
}
