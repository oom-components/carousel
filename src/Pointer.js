import d from 'd_js';
import Pep from 'pepjs';

export default class Pointer {
    constructor(carrousel) {
        this.carrousel = carrousel;
    }

    start() {
        const element = this.carrousel.tray;
        element.setAttribute('touch-action', 'none');
        let lastEvent;
        this.pointers = {};
        this.events = {
            down: e => {
                lastEvent = 'down';
                e.preventDefault();
                this.transition = d.css(element, 'transition');
                d.css(element, 'transition', 'none');
                this.pointers[e.pointerId] = {
                    x: e.clientX - this.carrousel.x
                };
            },

            move: e => {
                const pointer = this.pointers[e.pointerId];

                if (pointer) {
                    lastEvent = 'move';
                    e.preventDefault();
                    this.carrousel.translateX(e.clientX - pointer.x);
                }
            },

            up: e => {
                if (lastEvent === 'move') {
                    e.preventDefault();
                } else if (e.type === 'pointerup' && e.target.tagName === 'A') {
                    //bug in firefox (android) that disable the click in links
                    setTimeout(() => {
                        if (lastEvent !== 'click') {
                            if (e.target.target) {
                                window.open(e.target.href, e.target.target);
                            } else {
                                document.location = e.target.href;
                            }
                        }
                    }, 100);
                } else if (e.type === 'click') {
                    lastEvent = 'click';
                }

                if (this.pointers[e.pointerId]) {
                    d.css(element, 'transition', this.transition);
                    delete this.pointers[e.pointerId];
                    this.carrousel.refresh();
                }
            }
        };

        d.on('pointerdown', element, this.events.down);
        d.on('pointermove', element, this.events.move);
        d.on('pointerup pointerleave click', element, this.events.up);
    }

    stop() {
        const element = this.carrousel.element;
        element.removeAttribute('touch-action', 'none');

        if (this.events) {
            d.off('pointerdown', element, this.events.down);
            d.off('pointermove', element, this.events.move);
            d.off('pointerup pointerleave click', element, this.events.up);
            delete this.events;
        }
    }
}
