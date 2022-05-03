/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */


/*----------------------------------------
 nav js for animation starts here
 ----------------------------------------*/
menuToggler.addEventListener('click', ev => {
	menu.classList.toggle('open');
	menuToggler.textContent = menuToggler.textContent === "×" ? "≡" : "×";
});
/**
 * Enable hidden header
 */
 const nav = document.querySelector(".header");
 let lastScrollY = window.scrollY;
 const screensize = window.screen.width;

 window.addEventListener("scroll", () => {
   if (lastScrollY< window.scrollY && screensize >= 768) {
     nav.classList.add("header--hidden");
   } else {
     nav.classList.remove("header--hidden");
   }
   lastScrollY = window.scrollY;
 });
