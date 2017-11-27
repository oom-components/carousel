# PW Carrousel

Carrousel with the following features:

* Follows the progressive enhancement strategy:
  * **Works** with just `html`
  * **Works better** with `html` and `css`
  * **Works much better** with `html`, `css` and `js`
* CSS powered:
  * **High performance:** Use native scroll to move the elements.
  * **No need to wait for javascript** to build the carrousel.
  * No styles or themes are provided with this package. **You decide how the carrousel must look**.
* Responsive:
  * **Support for touch devices**
  * **Flexible.** Works in all screen sizes
  * **Light and fast**
* Modern:
  * Build with ES6 and modern tools (webpack, babel, etc)
  * Easy to extend and adapt to your needs

## Install

Requirements:

* NPM or Yarn to install [the package and the dependencies](https://www.npmjs.com/package/pw-carrousel)
* Webpack (or any other javascript loader)

Polyfills:

It's recommended to use [the Scroll Behaviour polyfill](https://github.com/iamdustan/smoothscroll) to [have better support for more browsers](https://caniuse.com/#feat=css-scroll-behavior)

```sh
npm install pw-carrousel
```

## Usage

### HTML

Let's start with the following html code:

```html
<ul class="carrousel" role="region" aria-label="Gallery" tabindex="0">
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

<button class="carrousel-next">Previous</button>
<button class="carrousel-prev">Next</button>
```

### CSS

Use css to define the carrousel appearance:

```css
.carrousel {
    width: 100%;
    overflow-x: scroll; /* this is important */
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}
.carrousel > li {
    padding: 2px;
    flex: 0 0 auto;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Carrousel from 'pw-carrousel';

//Init the carrousel
const slider = new Carrousel(document.querySelector('.carrousel'));

//Navigate
document.querySelector('.carrousel-next')
    .addEventListener('click', event => {
        slider.goto('+1');
        slider.player.stop();
    });

document.querySelector('.carrousel-prev')
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
