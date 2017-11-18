export default class Player {
    constructor(carrousel) {
        this.carrousel = carrousel;
        this.interval = 5000;
        this.direction = '+1';
        this.lastIndex = carrousel.index;
        this.isPlaying = false;
    }

    play(interval) {
        this.interval = interval || this.interval;

        const go = () => {
            let index = this.carrousel.getIndex(this.direction);

            if (index === this.lastIndex) {
                this.direction = this.direction === '+1' ? '-1' : '+1';
                index = this.carrousel.getIndex(this.direction);
            }

            this.carrousel.goto(index);
            this.lastIndex = index;
        };

        this.isPlaying = true;
        this.timeout = setTimeout(go, this.interval);
    }

    stop() {
        clearInterval(this.timeout);
        this.isPlaying = false;
    }

    restart() {
        this.stop();
        this.play();
    }
}
