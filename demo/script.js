import Carousel from "../src/carousel.js";
import Player from "../src/player.js";
import Navigation from "../src/navigation.js";

customElements.define("oom-carousel", Carousel);
customElements.define("oom-carousel-navigation", Navigation);

const carousel = document.querySelector("oom-carousel");
const player = new Player(carousel);

document
  .querySelector(".play-stop")
  .addEventListener(
    "click",
    () => (player.isPlaying ? player.stop() : player.play()),
  );
