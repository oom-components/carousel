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
    overflow-x: scroll; /* makes it scrollable without javascript. It will be removed by javascript */
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
const myCarrousel = new Carrousel(
    document.querySelector('.carrousel'),
    {
        fitToLimits: true
    }
);

//Navigate
document.querySelector('.carrousel-next')
    .addEventListener('click', event => myCarrousel.move('+1'));

document.querySelector('.carrousel-prev')
    .addEventListener('click', event => myCarrousel.move('-1'));
```

## Settings

Name | Type | Default | Description
-----|------|---------|------------
**offset** | `integer` or `"center"` | `0` | Horizontal offset of the tray position in pixels. It can be also "center" to center the current slide in the container
**fitToLimits** | `bool` | `false` | Whether the tray must fit to the container limits.
**index** | `integer` | `0` | The 0-based position of the initial slide visible

## API

### play / pause

Init a slideshow. Use the first argument to define the time to wait before change to the next slide. By default is `5000` (5 seconds). Example:

```js
//Start the slideshow
myCarrousel.play();

//Start the slideshow with 10 seconds to wait between slides
myCarrousel.play(10000);

//Pause
myCarrousel.pause();
```

### move

Moves the tray to other position:

```js
myCarrousel.move(3); //go to slider 3
myCarrousel.move('+1'); //move one slider forward (slider 4)
myCarrousel.move('-2'); //move two sliders backward (slider 2)
myCarrousel.move('first'); //go to first slider
myCarrousel.move('last'); //go to the last slider
```

### drag

Enable/disable dragging

```js
myCarrousel.drag(true); //enable
myCarrousel.drag(false); //disable
```

### refresh

Refresh the position of the tray to snap to the sliders. It's used after dragging and can be invoked on resize the window.

### destroy

Unbind all events and restore the dom to the previous state.

## Demo

To run the demo, just clone this repository enter in the directory and execute:

```sh
npm install
npm start
```

You should see something in `http://localhost:8080/`
