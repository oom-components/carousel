# PW Carrousel

Carrousel with the following features:

* Follows the progressive enhancement strategy:
  * **Works** with just `html`
  * **Works better** with `html` and `css`
  * **Works much better** with `html`, `css` and `js`
* CSS powered:
  * **High performance:** Use css transform to translate the elements.
  * **No need to wait for javascript** to build the carrousel.
  * No styles or themes are provided with this package. **You decide how the carrousel must look**.
* Responsive:
  * **Support for touch devices**
  * **Flexible.** Works in all screen sizes
  * **Light and fast**
* Modern:
  * Build with ES6 and modern tools (webpack, babel, etc)
  * Easy to extend and adapt to your needs
  * Support for all **modern browsers.** IE10+ should work

## Install

Requirements:

* NPM or Yarn to install [the package and the dependencies](https://www.npmjs.com/package/pw-carrousel)
* Webpack (or any other javascript loader)

Polyfills:

It's recommended to use [the Scroll Behaviour polyfill](https://github.com/iamdustan/smoothscroll) to [have support for more browsers](https://caniuse.com/#feat=css-scroll-behavior)

```sh
npm install pw-carrousel
```

## Usage

### HTML

Let's start with the following html code:

```html
<div class="carrousel">
    <ul>
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
</div>

<button class="carrousel-next">Previous</button>
<button class="carrousel-prev">Next</button>
```

### CSS

Use css to define the carrousel appearance:

```css
.carrousel {
    width: 100%;
    overflow-x: scroll;
}
.carrousel ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    transition: transform .5s;
}
.carrousel li {
    padding: 2px;
    flex: 0 0 500px;
}
```

### JS

And finally use javascript for a complete experience:

```js
import Carrousel from 'pw-carrousel';

//Init the carrousel
const div = document.querySelector('.carrousel');
const myCarrousel = new Carrousel(div);

//Navigate
document.querySelector('.carrousel-next')
    .addEventListener('click', event => {
        myCarrousel.move('+1');
        myCarrousel.player.stop();
    });

document.querySelector('.carrousel-prev')
    .addEventListener('click', event => {
        myCarrousel.move('-1');
        myCarrousel.player.stop();
    });

//Autoplay
myCarrousel.player.play();
```

## Settings

Name | Type | Default | Description
-----|------|---------|------------
**index** | `integer` | `0` | The 0-based position of the initial slide visible
**hideScrollElement** | `HTMLElement` | `undefined` | The parent element used to hide the scroll

## Player

Use the property `player` to access to the player in order to init a slideshow. Example:

```js
//Start the slideshow
myCarrousel.player.play();

//Start the slideshow with 10 seconds to wait between slides
myCarrousel.player.play(10000);

//Stop
myCarrousel.player.stop();
```

## goto

Moves the slide to other position:

```js
myCarrousel.goto(3); //go to slider 3
myCarrousel.goto('+1'); //move one slider forward (slider 4)
myCarrousel.goto('-2'); //move two sliders backward (slider 2)
myCarrousel.goto('first'); //go to first slider
myCarrousel.goto('last'); //go to the last slider
```

## refresh

Refresh the position of the tray to snap to the sliders. It's used automatically on scroll the tray, resize the window, etc.

## Demo

To run the demo, just clone this repository, enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in `http://localhost:8080/`
