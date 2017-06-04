# PW Carrousel

Carrousel with the following features:

* Follows the progressive enhancement strategy: if the javascript fail, the web page keeps working.
* Allows to apply transformations to the element (scale, rotate, translate, etc)
* Allows to drag the element
* No css provided: you have all control about how this component must look.

## Requirements

* NPM to install the package and the dependencies
* Webpack (or any other javascript loader)

## Browser supports

* Any modern web
* Not tested in IE but should work (at least in IE11)

## Install

Use `npm` or yarn to install this package

```
npm install pw-carrousel
```

## Usage

Let's say we have the following html code:

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

	<button class="carrousel-next">Previous</button>
	<button class="carrousel-prev">Next</button>
</figure>
```

Now, we need some css code:

```css
.carrousel {
	width: 100%;
	overflow-x: scroll; /* to work even without javascript */
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

And finally init the carrousel:

```js
import Carrousel from 'pw-carrousel';

var settings = {
	index: 0,
	offset: 0,
	forceSteps: false,
	fitToLimits: false
};

//Init the carrousel
var myCarrousel = new Carrousel(document.querySelector('.carrousel'), settings);

//Navigate
document.querySelector('.carrousel-next').addEventListener('click', function () {
    myCarrousel.goTo('+1');
});

document.querySelector('.carrousel-prev').addEventListener('click', function () {
    myCarrousel.goTo('-1');
});
```
