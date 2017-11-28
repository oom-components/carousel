export default class Player {
    constructor(carousel) {
        this.carousel = carousel;
        this.interval = 5000;
        this.direction = '+1';
        this.isPlaying = false;
    }

    play(interval = this.interval) {
        const go = () => {
            let slide = this.carousel.getSlide(this.direction);

            if (slide === this.carousel.current) {
                this.direction = this.direction === '+1' ? '-1' : '+1';
                slide = this.carousel.getSlide(this.direction);
            }

            this.carousel.goto(slide);
            this.play();
        };

        this.isPlaying = true;
        this.timeout = setTimeout(go, interval);
    }

    stop() {
        clearInterval(this.timeout);
        this.isPlaying = false;
    }
}
