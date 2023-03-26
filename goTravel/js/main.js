// Carousel
const owl = $('.owl-carousel');
owl.owlCarousel({
  center: true,
  loop: true,
  margin: 20,
  startPosition: 0,
  items: 1,
  responsive: {
    // breakpoint from 768 up
    768: {
      startPosition: 1,
      items: 3,
    },
    // breakpoint from 970 up
    970: {
      margin: 20,
      items: 3,
    },
    // breakpoint from 1200 up
    1200: {
      margin: 30,
    },
  },
});

// Go to the previous item
$('.slider__btn--prev').click(function () {
  owl.trigger('prev.owl.carousel');
});

// Go to the next item
$('.slider__btn--next').click(function () {
  owl.trigger('next.owl.carousel');
});

// menu icon
const navBtn = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
const menuIcon = document.querySelector('.menu-icon');

navBtn.onclick = function () {
  nav.classList.toggle('nav--mobile');
  menuIcon.classList.toggle('menu-icon--active');
  document.body.classList.toggle('no-scroll');
};
