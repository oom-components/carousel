import d from 'd_js';
import Unidragger from 'unidragger';

class Dragger extends Unidragger {

    constructor (carrousel) {
        super();
        this.carrousel = carrousel;
        this.handles = [carrousel.tray];
        this.bindHandles();
    }

    dragStart(event, pointer) {
    	this.x = this.carrousel.x;
    	this.transition = d.css(this.carrousel.tray, 'transition');
    	this.limits = this.carrousel.getLimits();
    	d.css(this.carrousel.tray, 'transition', 'none');
    }

    dragMove(event, pointer, moveVector) {
    	const x = this.x + moveVector.x;

    	if (x < this.limits[0] && x > this.limits[1]) {
    		this.carrousel.translateX(x);
    	}
    }

    dragEnd(event, pointer) {
    	d.css(this.carrousel.tray, 'transition', this.transition);
    }
}

export default class Carrousel {
	constructor(element, settings) {
		settings = settings || {};
		d.css(element, 'overflow-x', 'hidden');

		this.element = element;
		this.tray = element.firstElementChild;
		this.slides = d.getAll(this.tray.children);

		this.events = { zoom: [] };
		this.offset = settings.offset || 0;
		this.fitToLimits = settings.fitToLimits || false;
		this.forceSteps = settings.forceSteps || false;
		this.index = settings.index || 0;
		this.interval = settings.interval || 5000;
		this.direction = '+1';
		this.goTo(this.index);
		this.dragger = new Dragger(this);
	}

	goTo(position) {
		const index = this.getIndex(position);
		const target = this.slides[index];

		let x = getX(this.slides.slice(0, index));

		//Offset
		if (this.offset === 'center') {
			x += (this.element.offsetWidth - target.offsetWidth) / 2;
		} else {
			x += this.offset || 0;
		}

		if (this.forceSteps) {
			this.index = index;
		}

		//Fit to limits
        if (this.fitToLimits) {
            if (x > 0) {
                x = 0;
            } else {
            	let max = getX(this.slides) + this.element.offsetWidth;

            	if (x < max) {
                	x = max;
                } else {
            		this.index = index;
            	}
            }
        } else {
        	this.index = index;
        }

        this.translateX(x);
	}

	getLimits() {
		let min = 0;
		let max = getX(this.slides) + this.element.offsetWidth;

		if (!this.fitToLimits) {
			if (this.offset === 'center') {
				min += (this.element.offsetWidth - this.slides[0].offsetWidth) / 2;
				max -= (this.element.offsetWidth - this.slides[this.slides.length - 1].offsetWidth) / 2;
			} else {
				min += this.offset || 0;
				max += this.offset || 0;
			}
		}

		return [min, max];
	}

	getIndex(position) {
		if (position === undefined || position === 'current') {
			return this.index;
		}

		if (position === 'first') {
			return 0;
		}

		if (position === 'last') {
			return this.slides.length - 1;
		}

		if (typeof position === 'string') {
			if (/^\+[0-9]+$/.test(position)) {
	            position = this.index + (parseInt(position.substr(1), 10));
	        } else if (/^\-[0-9]+$/.test(position)) {
	            position = this.index - (parseInt(position.substr(1), 10));
	        } else {
	        	position = parseInt(position);
	        }
		}

		if (position < 0) {
			return 0;
		}

		if (position >= this.slides.length) {
			return this.slides.length - 1;
		}

		return position;
	}

	play() {
		const last = this.getIndex('last');
		const go = () => {
			if (this.index === last) {
				this.direction = '-1';
			} else {
				this.direction = '+1';
			}

			this.goTo(this.direction);
		};

		this.playing = true;
		this.timeout = setTimeout(go, this.interval);
	}

	stop() {
		clearInterval(this.timeout);
		this.playing = false;
	}

	translateX(x) {
		this.x = x;
		d.css(this.tray, 'transform', 'translateX(' + x + 'px)');

		if (this.playing) {
            this.stop();
            this.play();
        }
	}
};

function getX(slides) {
	let width = 0;

	slides.forEach(slide => {
		const style = getComputedStyle(slide);
		width -= slide.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
	});
	
	return width;
}
