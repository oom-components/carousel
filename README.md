# @oom/carousel

Web component to create a carousel:

- No dependencies
- Very light
- Follows the **progressive enhancement strategy:**
  - Works with just `html`
  - Works better with `html` and `css`
  - Works much better with `html`, `css` and `js`
  - Works much much better when `js` polyfills are not needed
- High performance: Use native scroll to move the elements.
- No need to wait for javascript to build the carousel.
- No styles or themes are provided with this package. You decide how the
  carousel must look.
- Support for touch devices
- Support for keyboard
- Build with modern javascript, using ES6 modules and custom elements

## Usage

## Usage

Import and register the component with the desired tag name:

```js
import Carousel from "./carousel/carousel.js";

customElements.define("oom-carousel", Carousel);
```

Create the following HTML code. The accesibility attributes (`role`,
`arial-label` and `tabindex` are highly recomended).

```html
<oom-carousel role="region" aria-label="Gallery" tabindex="0">
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
</oom-carousel>
```

Use css to define the carousel appearance:

```css
oom-carousel {
  overflow-x: scroll;
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
oom-carousel > div {
  flex: 0 0 auto;
  scroll-snap-align: center;
}
```

### Navigation

This package exports also a `Navigation` custom element to manipulate the
carousel:

```js
import { Navigation } from "./carousel/carousel.js";

customElements.define("oom-navigation", Navigation);
```

```html
<oom-carousel role="region" aria-label="Gallery" tabindex="0">
  ...
</oom-carousel>

<oom-navigation>
  <button value="+1" class="carousel-1">Go 1 slide forward</button>
  <button value="-1" class="carousel--1">Go 1 slide backward</button>
  <button value="prev" class="carousel-prev">Previous page</button>
  <button value="next" class="carousel-next">Next page</button>
  <a href="#slide-6">Go to slide 6</a>
</oom-navigation>
```

## API

```js
//Get/set the slide index
carousel.index = 3; //move to the slide 3
const currIndex = carousel.index; //get the current slide index
carousel.index += 1; //move to the next slide
carousel.index -= 1; //move to the previous slide

//Move the slide using scroll
let atBeginning = carousel.scrollFromLeft === 0; //Determine whether the scroll is at begining
let atTheEnd = carousel.scrollFromRight === 0; //Determine whether the scroll is at the end

carousel.scrollFromLeft = 0; //Performs a scroll to the beginning
carousel.scrollFromRight = 0; //Performs a scroll to the end
carousel.next(); //Move the scroll to next
carousel.prev(); //Move the scroll to previous
```
