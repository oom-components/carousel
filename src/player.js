export default class Player {
    constructor(carousel) {
        this.carousel = carousel;
        this.interval = 5000;
        this.direction = '+1';
        this.isPlaying = false;
    }

    play(interval = this.interval) {
        const go = () => {
            if (this.carousel.scrollIsAtTheBeginning()) {
                this.direction = '+1';
            } else if (this.carousel.scrollIsAtTheEnd()) {
                this.direction = '-1';
            }

            this.carousel.goto(this.direction);
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
