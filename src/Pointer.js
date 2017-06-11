import d from 'd_js';
import Pep from 'pepjs';

export default class Pointer {
    constructor(carrousel) {
        this.carrousel = carrousel;
    }

    start() {
        const element = this.carrousel.tray;
        element.setAttribute('touch-action', 'none');

        this.pointers = {};
        this.events = {
            down: e => {
                this.transition = d.css(element, 'transition');
                d.css(element, 'transition', 'none');
                this.pointers[e.pointerId] = {
                    x: e.clientX - this.carrousel.x
                };
            },

            up: e => {
                if (this.pointers[e.pointerId]) {
                    d.css(element, 'transition', this.transition);
                    delete this.pointers[e.pointerId];
                    this.carrousel.refresh();
                }
            },

            move: e => {
                const pointer = this.pointers[e.pointerId];

                if (pointer) {
                    this.carrousel.translateX(e.clientX - pointer.x);
                }
            }
        };

        d.on('pointerdown', element, this.events.down);
        d.on('pointerup pointerleave', element, this.events.up);
        d.on('pointermove', element, this.events.move);
    }

    stop() {
        const element = this.carrousel.element;
        element.removeAttribute('touch-action', 'none');

        d.off('pointerdown', element, this.events.down);
        d.off('pointerup pointerleave', element, this.events.up);
        d.off('pointermove', element, this.events.move);
    }
}
