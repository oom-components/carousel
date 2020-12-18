export default class Carousel extends HTMLElement {
  static get observedAttributes() {
    return ["index"];
  }

  constructor() {
    super();
    this.scrollBehavior = "smooth";
    this.history = "push";
  }

  connectedCallback() {
    //To calculate the offset of slides relative to the document
    if (getStyleValue(this, "position") === "static") {
      this.style.position = "relative";
    }

    this.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 37: //left
          this.index -= 1;
          e.preventDefault();
          break;

        case 39: //right
          this.index += 1;
          e.preventDefault();
          break;
      }
    });

    checkScrollSupport(this);
    checkA11y(this);

    //Handle navigation if children have ids
    if (this.querySelector(":scope > [id]")) {
      window.addEventListener(
        "popstate",
        (event) => handleTarget(this, document.location.hash),
      );

      if (document.location.hash) {
        handleTarget(this, document.location.hash);
      } else if (this.children[0]) {
        handleHistory(this.children[0].id, this.history);
      }

      let scrolling;

      function handleScroll() {
        clearTimeout(scrolling);
        scrolling = setTimeout(() => {
          handleHistory(this.target.id, this.history);
        }, 50);
      }

      this.addEventListener("scroll", handleScroll, false);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "index") {
      this.index = parseInt(newValue);
      return;
    }
  }

  next(amount = 1) {
    this.scrollFromLeft += this.clientWidth * amount;
  }

  prev(amount = 1) {
    this.scrollFromLeft -= this.clientWidth * amount;
  }

  get index() {
    const total = this.children.length - 1;
    const slides = this.children;

    for (let index = 0; index < total; index++) {
      const slide = slides[index];
      const scroll = Math.round(slide.offsetLeft - this.clientWidth / 2);

      if (
        this.scrollLeft >= scroll &&
        this.scrollLeft <= scroll + slide.clientWidth
      ) {
        return index;
      }
    }

    return total;
  }

  set index(index) {
    if (typeof index !== "number" || Math.round(index) !== index) {
      throw new Error("Invalid index value. It must be an integer");
    }

    const slides = this.children;
    index = Math.min(Math.max(index, 0), slides.length - 1);
    this.target = slides[index];
  }

  get target() {
    return this.children[this.index];
  }

  set target(target) {
    if (target.parentElement !== this) {
      throw new Error("The target must be a direct child of this element");
    }

    const scroll = Math.round(
      target.offsetLeft - this.clientWidth / 2 + target.clientWidth / 2,
    );
    this.scrollFromLeft = Math.max(0, scroll);
  }

  get scrollFromLeft() {
    return this.scrollLeft;
  }

  set scrollFromLeft(scroll) {
    try {
      this.scroll({
        left: scroll,
        behavior: this.scrollBehavior,
      });
    } catch (err) {
      this.scrollLeft = scroll;
    }
  }

  get scrollFromRight() {
    return this.scrollWidth - this.clientWidth - this.scrollLeft;
  }

  set scrollFromRight(scroll) {
    this.scrollFromLeft = this.scrollWidth - this.clientWidth - scroll;
  }
}
function handleTarget(el, hash) {
  if (!hash) {
    return;
  }

  const target = el.querySelector(`:scope > ${hash}`);

  if (target) {
    el.target = target;
  }
}

function handleHistory(id, mode) {
  if (!id || document.location.hash === `#${id}`) {
    return;
  }
  switch (mode) {
    case "push":
      history.pushState({}, null, `#${id}`);
      break;
    case "replace":
      history.replaceState({}, null, `#${id}`);
      break;
  }
}

function getStyleValue(el, name) {
  const value = getComputedStyle(el)[name];

  if (value && value.replace(/none/g, "").trim()) {
    return value;
  }
}

function checkScrollSupport(element) {
  const support = "scroll" in element && "scrollBehavior" in element.style;

  if (!support) {
    console.info(
      "@oom/carusel [compatibility]:",
      'Missing smooth scrolling support. Consider using a polyfill like "smoothscroll-polyfill"',
    );
  }
}

function checkA11y(element) {
  if (element.getAttribute("role") !== "region") {
    console.info(
      "@oom/carusel [accesibility]:",
      'Missing role="region" attribute in the carousel element',
    );
  }

  if (!element.hasAttribute("aria-label")) {
    console.info(
      "@oom/carusel [accesibility]:",
      "Missing aria-label attribute in the carousel element",
    );
  }

  if (!element.hasAttribute("tabindex")) {
    console.info(
      "@oom/carusel [accesibility]:",
      'Missing tabindex="0" attribute in the carousel element',
    );
  }
}
