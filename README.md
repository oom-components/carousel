# PW Carousel

Carousel with the following features:

* No dependencies
* Light: Less than 300 lines of code (including comments and spaces)
* Follows the **progressive enhancement strategy:**
  * Works with just `html`
  * Works better with `html` and `css`
  * Works much better with `html`, `css` and `js`
* High performance: Use native scroll to move the elements.
* No need to wait for javascript to build the carousel.
* No styles or themes are provided with this package. You decide how the carousel must look.
* Support for touch devices
* Support for keyboard
* Build with modern javascript, using ES6 modules

## Install

Requirements:

* NPM or Yarn to install [the package](https://www.npmjs.com/package/@oom/carousel)
* It's recommended to use [the Scroll Behaviour polyfill](https://github.com/iamdustan/smoothscroll) to [have better support for more browsers](https://caniuse.com/#feat=css-scroll-behavior)

```sh
npm install @oom/carousel
npm install smoothscroll-polyfill
```

## Usage

### HTML

Let's start with the following html code:

```html
<ul class="carousel" role="region" aria-label="Gallery" tabindex="0">
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
    <li><img src="http://placehold.it/500x300"></li>
</ul>

<button class="carousel-next">Previous</button>
<button class="carousel-prev">Next</button>
```

### CSS

Use css to define the carousel appearance:

```css
.carousel {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}
.carousel > li {
    padding: 2px;
    flex: 0 0 auto;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Carousel from './carousel/carousel.js';

//Init the carousel
const slider = new Carousel(document.querySelector('.carousel'));

//Navigate
document.querySelector('.carousel-next')
    .addEventListener('click', event => {
        slider.goto('+1');
        slider.player.stop();
    });

document.querySelector('.carousel-prev')
    .addEventListener('click', event => {
        slider.goto('-1');
        slider.player.stop();
    });

//Autoplay
slider.player.play();
```

### goto

Moves the slide to other position:

```js
slider.goto(3); //go to slider 3
slider.goto('+1'); //move one slider forward (slider 4)
slider.goto('-2'); //move two sliders backward (slider 2)
slider.goto('first'); //go to first slider
slider.goto('last'); //go to the last slider
slider.goto('current'); //go to the current slider (refresh the position)
slider.goto('+50%'); //move the slider forward 50% of the carousel width
slider.goto('-100%'); //move the slider backward 100% of the carousel width
```

## Player

Use the module `player` to access to the player in order to init a slideshow. Example:

```js
import Player from './carousel/player.js';

const player = new Player(slider);

//Start the slideshow
player.play();

//Start the slideshow with 10 seconds to wait between slides
player.play(10000);

//Stop
player.stop();
```


## Demo and tests

To run the demo, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in the following urls:

- Demo: `http://localhost:8080/demo`
- Test: `http://localhost:8080/test`
