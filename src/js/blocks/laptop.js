/**
 * Laptop
 */

import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
  const cardsInstances = [];

  const sliderInit = () => {
    [...document.querySelectorAll(".js-laptop-slider-wrapper")].forEach((slider) => {
      const sliderMain = slider.querySelector(".js-laptop-slider");
      const sliderNavs = slider.querySelector(".js-laptop-slider-navs");
      console.log(sliderNavs);

      const instance = new Splide(sliderMain, {
        arrows: false,
        pagination: false,
        drag: false,
        perPage: 1,
        perMove: 1,
        gap: 28,
        type  : 'fade',
        rewind: true,
      });

      const instanceNavs = new Splide(sliderNavs, {
        arrows: false,
        pagination: false,
        drag: false,
        perPage: 3,
        perMove: 0,
        gap: 10,
        isNavigation : true,
        focus : 'left',
      });

      instance.sync( instanceNavs );
      instance.mount();
      instanceNavs.mount();
      cardsInstances.push(instance);
    });
  };

  sliderInit();
});
