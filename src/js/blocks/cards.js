/**
 * Cards
 */

import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
  const cardsInstances = [];

  const sliderInit = () => {
    [...document.querySelectorAll(".js-cards-slider")].forEach((slider) => {
      const instance = new Splide(slider, {
        arrows: false,
        pagination: true,
        drag: false,
        perPage: 3,
        perMove: 1,
        gap: 28,
        breakpoints: {
          767: {
            perPage: 1,
            drag: true,
          },
          1229: {
            perPage: 2,
            drag: true,
          },
        },
      });

      instance.mount();
      cardsInstances.push(instance);
    });
  };

  sliderInit();
});
