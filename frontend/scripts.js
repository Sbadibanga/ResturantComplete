/* eslint-disable no-param-reassign */


/*----------------------------------------
 nav js for animation starts here
 ----------------------------------------*/
 /* const navSlide = () =>{
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');
    // toggle Nav
    burger.addEventListener('click', () =>{
      nav.classList.toggle('nav-active');
      // Animate links
      navLinks.forEach((link, index) => {
        if(link.style.animation ){
          link.style.animation = ''
        }else{
          link.style.animation = `navLinkFade 0.5 ease forwards ${index/7 + 2.0}s`
      }
      });
      // burger animation
      burger.classList.toggle('toggle');
    })
 }
 navSlide();
/**
 * Enable hidden header
 */
 const nav = document.querySelector(".header");
 let lastScrollY = window.scrollY;

 window.addEventListener("scroll", () => {
   if (lastScrollY< window.scrollY) {
     nav.classList.add("header--hidden");
   } else {
     nav.classList.remove("header--hidden");
   }
   lastScrollY = window.scrollY;
 });
