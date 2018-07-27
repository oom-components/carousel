# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## [3.0.0] - 2018-07-27

### Changed

- Decoupled `Carousel` and `Player` modules.
- Use native custom elements to build the component.
- Removed `settings.scrollBehavior` and replaced with `scrollBehavior`.
- API Change: Removed `goto()` method and replaced with `index` property, that only accept integers.
- API Change: Removed `scrollIsAtBeginning()` and `scrollIsAtTheEnd()` methods and replaced with `scrollFromLeft` and `scrollFromRight` properties.

### Fixed

- Improved `package.json` adding the `modules.root` entry.

## [2.0.0] - 2018-06-16

### Added

- Allow to customize the scroll behavior using `settings.scrollBehavior`
- Browser tests

### Changed

- Renamed extensions from `.jsm` to `.js` due `Content-Type` header issues
- The `package.json` is now more browser-friendly using `browser` and `files` keys

### Removed

- Webpack & babel tools. This package should work as native ES6 modules. Progressive enhancement strategy should fallback to css and html for old browsers.

### Fixed

- Moved `smoothscroll-polyfill` dependency to devDependencies
- Improved current slide calculation

## [1.0.0] - 2018-05-01

### Added

- Added ability to move the carousel using percentages (ex: `carousel.goto("+100%")`)
- New function `scrollIsAtTheBeginning()` that returns whether the carousel scroll is at the beginning or not.
- New function `scrollIsAtTheEnd()` that returns whether the carousel scroll is at the end or not.
- Use `console.info` to display accesibility issues.

### Changed

- Rename package to `@oom/carousel`
- The current slide is centered instead aligned to left
- Updated dev dependencies to the latest version
- Changed the file extension to `jsm` for compatibility with native es6 modules

## [0.8.1] - 2017-12-02

### Fixed

- Fixed an exception if a slide is undefined
- Fixed css snap points when it's supported but the value is "none"

## [0.8.0] - 2017-12-02

### Added

- Keyboard support

### Changed

- Renamed the project to `pw-carousel` (instead `pw-carrousel`)

### Removed

- Removed dependency of `d_js`. You can install it for yourself or use [other dom4 polyfill](https://github.com/WebReflection/dom4) to have support for old browsers

### Fixed

- Improved snapping

## [0.7.0] - 2017-11-27

### Changed

- Improved the html using some recomendations from https://inclusive-components.design/a-content-slider/
- Simplified the html structure. The carrousel uses only a simply `<ul>` element.
- Fake snap will be used if **css scroll snap points** are not detected/supported
- Fixed progressive enharcement in IE9

### Removed

- Removed all options (`snap` and `index`).
- Removed unused dependency PEP

## [0.6.0] - 2017-11-20

### Added

- New `snap` option.

### Removed

- Removed the `hideScrollElement` option.

## [0.5.1] - 2017-11-18

### Fixed

- `main` value in `package.json` was wrong

## [0.5.0] - 2017-11-18

### Changed

- Switch approach from a transform/translate to a scroll based carrousel
- `move()` was renamed to `goto()`

### Removed

- ES2015 dist version has been removed. From now, this library is ES6 only. You must use Babel or other transpiler for old browsers compatibility.
- Removed drag support and use just native scroll.
- `.play()` and `.pause()` was removed. Use the property `.player` to access to the player instance.
- Removed `.destroy()`
- Removed the option `fitToLimits` because it makes no sense using native scroll
- Removed the option `offset`. It may be reintroduced in a future.

## [0.4.1] - 2017-08-05

### Fixed

- Upgraded `d_js` to 2.0.

## [0.4.0] - 2017-07-22

### Added

- New method `.destroy()`, to unbind all events.

### Fixed

- Fixed bug on disable drag

## [0.3.7] - 2017-07-08

### Fixed

- Fixed bug that makes some links non clicable

## [0.3.6] - 2017-07-06

### Fixed

- Improved drag detection
- Fixed links that are non clicable in firefox for android

## [0.3.5] - 2017-06-18

### Fixed

- Fixed link clicks in firefox for android

## [0.3.4] - 2017-06-17

### Fixed

- Prevent default events on dragging

## [0.3.3] - 2017-06-11

### Fixed

- Fixed the configuration of babel on publish the package

## [0.3.2] - 2017-06-11

### Changed

- Replaced unidragger dependency with standard Pointer events, using jquery PEP as polyfill

## [0.3.1] - 2017-06-06

### Fixed

- Fixed undefined method error

## [0.3.0] - 2017-06-05

### Added

- New method `drag()` to enable/disable dragging

## [0.2.0] - 2017-06-04

### Added

- New method `refresh()` to refresh the tray position to snap the sliders.

## [0.1.1] - 2017-06-04

### Fixed

- Fixed urls in `package.json`

## 0.1.0 - 2017-06-04

First version with basic features


[3.0.0]: https://github.com/oom-components/carousel/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/oom-components/carousel/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/oom-components/carousel/compare/v0.8.1...v1.0.0
[0.8.1]: https://github.com/oom-components/carousel/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/oom-components/carousel/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/oom-components/carousel/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/oom-components/carousel/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/oom-components/carousel/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/oom-components/carousel/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/oom-components/carousel/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/oom-components/carousel/compare/v0.3.7...v0.4.0
[0.3.7]: https://github.com/oom-components/carousel/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/oom-components/carousel/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/oom-components/carousel/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/oom-components/carousel/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/oom-components/carousel/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/oom-components/carousel/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/oom-components/carousel/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/oom-components/carousel/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/oom-components/carousel/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/oom-components/carousel/compare/v0.1.0...v0.1.1
