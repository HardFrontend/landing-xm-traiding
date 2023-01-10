/**
 * Header
 */

window.addEventListener("DOMContentLoaded", () => {
  const mburger = document.querySelector(".js-mburger");
  const header = document.querySelector(".js-main-header");
  const body = document.querySelector("body");


  if (mburger && header) {
    mburger.addEventListener('click', (e) => {
      if (header.classList.contains("main-header--active")) {
        body.classList.remove("noscroll");
        header.classList.remove("main-header--active");
      } else {
        body.classList.add("noscroll");
        header.classList.add("main-header--active");
      }
    })
  }

});
