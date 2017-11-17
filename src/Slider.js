import d from 'd_js';

export default class Slider {
    constructor(carrousel) {
        this.carrousel = carrousel;

        const element = this.carrousel.element;
        element.setAttribute('touch-action', 'none');

        let pointer = {};

        this.events = {
            down: e => {
                e.preventDefault();

                pointer = {
                    id: e.pointerId,
                    x: element.scrollLeft + e.clientX,
                    lastEvent: 'down'
                };
            },

            move: e => {
                if (pointer.id === e.pointerId) {
                    pointer.lastEvent = 'move';
                    e.preventDefault();
                    element.scrollLeft = pointer.x - e.clientX;
                }
            },

            up: e => {
                if (pointer.id) {
                    this.carrousel.refresh();
                    delete pointer.id;
                }

                if (pointer.lastEvent === 'move') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                pointer.lastEvent = 'click';
            }
        };

        d.on('pointerdown', element, this.events.down);
        d.on('pointermove', element, this.events.move);
        d.on('pointerup pointerleave click', element, this.events.up);
    }

    destroy() {
        const element = this.carrousel.element;
        element.removeAttribute('touch-action', 'none');

        d.off('pointerdown', element, this.events.down);
        d.off('pointermove', element, this.events.move);
        d.off('pointerup pointerleave click', element, this.events.up);
    }
}
