# PW Carousel

Carousel with the following features:

* No dependencies
* Light: Aprox 200 lines of code (including comments and spaces)
* Follows the **progressive enhancement strategy:**
  * Works with just `html`
  * Works better with `html` and `css`
  * Works much better with `html`, `css` and `js`
* High performance: Use native scroll to move the elements.
* No need to wait for javascript to build the carousel.
* No styles or themes are provided with this package. You decide how the carousel must look.
* Support for touch devices
* Support for keyboard
* Build with modern javascript, using ES6 modules and custom elements

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
<my-carousel role="region" aria-label="Gallery" tabindex="0">
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
    <div><img src="http://placehold.it/500x300"></div>
</my-carousel>

<button class="carousel-next">Previous</button>
<button class="carousel-prev">Next</button>
```

### CSS

Use css to define the carousel appearance:

```css
my-carousel {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    scroll-snap-type: mandatory;
}
my-carousel > div {
    padding: 2px;
    flex: 0 0 auto;
    scroll-snap-align: center;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Carousel from './carousel/carousel.js';
import Player from './carousel/player.js';

//Register the custom element
customElements.define('oom-carousel', Carousel);

//Select the carousel
const carousel = document.querySelector('my-carousel');
const player = new Player(carousel);

//Navigate
document.querySelector('.carousel-next')
    .addEventListener('click', event => {
        carousel.index += 1;
        player.stop();
    });

document.querySelector('.carousel-prev')
    .addEventListener('click', event => {
        carousel.index -= 1;
        player.stop();
    });

//Autoplay
player.play();
```

## Player

Use the module `player` to access to the player in order to init a slideshow. Example:

```js
import Player from './carousel/player.js';

const player = new Player(carousel);

//Start the slideshow
player.play();

//Start the slideshow with 10 seconds to wait between slides
player.play(10000);

//Stop
player.stop();
```


## Demo and tests

- Demo: https://oom-components.github.io/carousel/demo
- Tests: https://oom-components.github.io/carousel/tests

To run the demo locally, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in the following urls:

- Demo: `http://localhost:8080/demo`
- Test: `http://localhost:8080/tests`
