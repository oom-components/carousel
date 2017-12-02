# PW Carousel

Carousel with the following features:

* No dependencies
* Light: Just ~5Kb (without minifying or polyfills)
* Follows the progressive **enhancement strategy:**
  * Works with just `html`
  * Works better with `html` and `css`
  * Works much better with `html`, `css` and `js`
* High performance: Use native scroll to move the elements.
* No need to wait for javascript to build the carousel.
* No styles or themes are provided with this package. You decide how the carousel must look.
* Support for touch devices
* Support for keyboard
* Build with ES6, so you may need a transpiler for old browser support

## Install

Requirements:

* NPM or Yarn to install [the package](https://www.npmjs.com/package/pw-carousel)

## Polyfills:

It's recommended to use [the Scroll Behaviour polyfill](https://github.com/iamdustan/smoothscroll) to [have better support for more browsers](https://caniuse.com/#feat=css-scroll-behavior)

```sh
npm install pw-carousel
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
    overflow-x: scroll; /* this is important */
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
import Carousel from 'pw-carousel';

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

## Player

Use the property `player` to access to the player in order to init a slideshow. Example:

```js
//Start the slideshow
slider.player.play();

//Start the slideshow with 10 seconds to wait between slides
slider.player.play(10000);

//Stop
slider.player.stop();
```

## goto

Moves the slide to other position:

```js
slider.goto(3); //go to slider 3
slider.goto('+1'); //move one slider forward (slider 4)
slider.goto('-2'); //move two sliders backward (slider 2)
slider.goto('first'); //go to first slider
slider.goto('last'); //go to the last slider
slider.goto('current'); //go to the current slider (refresh the position)
```

## Demo

To run the demo, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in `http://localhost:8080/`
