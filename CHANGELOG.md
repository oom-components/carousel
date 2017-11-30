# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 0.8.0 - UNRELEASED

### Changed

* Renamed the project to `pw-carousel` (instead `pw-carrousel`)

### Added

* Keyboard support

### Removed

* Removed dependency of `d_js`. You can install it for yourself or use [other dom4 polyfill](https://github.com/WebReflection/dom4) to have support for old browsers

### Fixed

* Improved snapping

## 0.7.0 - 2017-11-27

### Improved

* Improved the html using some recomendations from https://inclusive-components.design/a-content-slider/

### Removed

* Removed all options (`snap` and `index`).
* Removed unused dependency PEP

### Changed

* Simplified the html structure. The carrousel uses only a simply `<ul>` element.
* Fake snap will be used if **css scroll snap points** are not detected/supported
* Fixed progressive enharcement in IE9

## 0.6.0 - 2017-11-20

### Added

* New `snap` option.

### Removed

* Removed the `hideScrollElement` option.

## 0.5.1 - 2017-11-18

### Fixed

* `main` value in `package.json` was wrong

## 0.5.0 - 2017-11-18

### Changed

* Switch approach from a transform/translate to a scroll based carrousel
* `move()` was renamed to `goto()`

### Removed

* ES2015 dist version has been removed. From now, this library is ES6 only. You must use Babel or other transpiler for old browsers compatibility.
* Removed drag support and use just native scroll.
* `.play()` and `.pause()` was removed. Use the property `.player` to access to the player instance.
* Removed `.destroy()`
* Removed the option `fitToLimits` because it makes no sense using native scroll
* Removed the option `offset`. It may be reintroduced in a future.

## 0.4.1 - 2017-08-05

* Upgraded `d_js` to 2.0.

## 0.4.0 - 2017-07-22

### Added

* New method `.destroy()`, to unbind all events.

### Fixed

* Fixed bug on disable drag

## 0.3.7 - 2017-07-08

### Fixed

* Fixed bug that makes some links non clicable

## 0.3.6 - 2017-07-06

### Fixed

* Improved drag detection
* Fixed links that are non clicable in firefox for android

## 0.3.5 - 2017-06-18

### Fixed

* Fixed link clicks in firefox for android

## 0.3.4 - 2017-06-17

### Fixed

* Prevent default events on dragging

## 0.3.3 - 2017-06-11

### Fixed

* Fixed the configuration of babel on publish the package

## 0.3.2 - 2017-06-11

### Changed

* Replaced unidragger dependency with standard Pointer events, using jquery PEP as polyfill

## 0.3.1 - 2017-06-06

### Fixed

* Fixed undefined method error

## 0.3.0 - 2017-06-05

### Added

* New method `drag()` to enable/disable dragging

## 0.2.0 - 2017-06-04

### Added

* New method `refresh()` to refresh the tray position to snap the sliders.

## 0.1.1 - 2017-06-04

### Fixed

* Fixed urls in `package.json`

## 0.1.0 - 2017-06-04

First version with basic features
