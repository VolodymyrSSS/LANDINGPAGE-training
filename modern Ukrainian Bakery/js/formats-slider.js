const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
    },
    // when window width is >= 768px
    1280: {
      slidesPerView: 3,
    },
  },
  pagination: {
    el: '.pagination',
    type: 'bullets',
    bulletClass: 'pagination-bullet',
    bulletActiveClass: 'pagination-bullet-active',
    clickable: true,
  },
  navigation: {
    nextEl: '.carousel-button.next',
    prevEl: '.carousel-button.prev',
  },
});
