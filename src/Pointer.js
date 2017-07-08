import d from 'd_js';
import Pep from 'pepjs';

export default class Pointer {
    constructor(carrousel) {
        this.carrousel = carrousel;
    }

    start() {
        const element = this.carrousel.tray;
        element.setAttribute('touch-action', 'none');

        let pointer = {};

        this.events = {
            down: e => {
                e.preventDefault();
                this.transition = d.css(element, 'transition');
                d.css(element, 'transition', 'none');

                pointer = {
                    id: e.pointerId,
                    x: e.clientX - this.carrousel.x,
                    lastEvent: 'down'
                };
            },

            move: e => {
                if (pointer.id === e.pointerId) {
                    pointer.lastEvent = 'move';
                    e.preventDefault();
                    this.carrousel.translateX(e.clientX - pointer.x);
                }
            },

            up: e => {
                if (pointer.id) {
                    d.css(element, 'transition', this.transition);
                    this.carrousel.refresh();
                    delete pointer.id;
                }

                if (pointer.lastEvent === 'move') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }

                if (e.type === 'pointerup' && getLink(e.target)) {
                    //bug in firefox (android) that disable the click in links
                    const link = getLink(e.target);
                    setTimeout(() => {
                        if (pointer.lastEvent !== 'click') {
                            if (link.target) {
                                window.open(link.href, link.target);
                            } else {
                                document.location = link.href;
                            }
                        }
                    }, 100);
                } else if (e.type === 'click') {
                    pointer.lastEvent = 'click';
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

function getLink(element) {
    if (element.tagName === 'A') {
        return element;
    }

    return element.closest && element.closest('a');
}
