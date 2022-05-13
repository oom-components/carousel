export default class Navigation extends HTMLElement {
  static get observedAttributes() {
    return ["for"];
  }

  get for() {
    const target = this.getAttribute("for");

    if (target) {
      return this.ownerDocument.getElementById(target);
    }
    console.info(
      "@oom/carusel [navigation]:",
      'Missing for="id" attribute in the carousel navigation element',
    );
  }

  connectedCallback() {
    const carousel = this.for;

    if (!carousel) {
      return;
    }

    const buttons = this.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", (ev) => {
        const value = button.value;

        if (!value) {
          return;
        }

        if (value === "next") {
          carousel.next();
        } else if (value === "prev") {
          carousel.prev();
        } else if (value.startsWith("+")) {
          carousel.index += parseInt(value.slice(1));
        } else if (value.startsWith("-")) {
          carousel.index -= parseInt(value.slice(1));
        } else if (value.match(/^\d+$/)) {
          carousel.index = parseInt(value);
        } else {
          const target = carousel.ownerDocument.getElementById(value);
          if (slide) {
            carousel.target = target;
          }
        }
      });
    });

    let isScrolling;

    carousel.addEventListener(
      "scroll",
      () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(showHideButtons, 10);
      },
      false,
    );

    carousel.addEventListener("mouseenter", showHideButtons);

    function showHideButtons() {
      buttons.forEach((button) => {
        const value = button.value;

        if (!value) {
          return;
        }

        if (value === "next" || value.startsWith("+")) {
          button.disabled = carousel.scrollFromRight < 5;
        } else if (value === "prev" || value.startsWith("-")) {
          button.disabled = carousel.scrollFromLeft < 5;
        }
      });
    }
    showHideButtons();
  }
}
