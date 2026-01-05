const mobileMenu = document.querySelector('.mobile-menu');
const menuBtnOpen = document.querySelector('.menu-btn-open');
const menuBtnClose = document.querySelector('.menu-btn-close');
const heroBtn = document.querySelector('.hero__btn');

const toggleMenu = isOpen => {
  mobileMenu.classList.toggle('is-open', isOpen);
  menuBtnOpen.setAttribute('aria-expanded', isOpen);

  // Додамо focus trapping, щоб користувачі клавіатури (Tab/Shift+Tab), коли відкрите
  // мобільне меню, не могли випадково перемістити фокус назад на сторінку за ним.
  if (isOpen) {
    // Це запобігає переміщенню фонового контенту під час скролу, коли відкрито мобільне меню
    document.body.style.overflow = 'hidden'; // Заблокувати scroll

    // Для динамічного фокусування за допомогою JS-а (не Таb-ом); фокус знаход в меню;
    // користувачі клавіатури не фокусують одразу на першому елементі меню але фокус знаходиться в меню
    mobileMenu.focus(); // перемістити фокус безпосередньо в контейнер

    // Перемістити фокус на перший елемент всередині меню
    const focusableElements = mobileMenu.querySelectorAll(
      'button, a, input, textarea, select',
    );
    if (focusableElements.length) {
      focusableElements[0].focus();
    }
    document.addEventListener('keydown', trapFocus);
  } else {
    document.body.style.overflow = ''; // Розблокувати scroll

    // Повернути фокус на кнопку burger
    menuBtnOpen.focus();
    document.removeEventListener('keydown', trapFocus);
  }
};

menuBtnOpen.addEventListener('click', () => toggleMenu(true));
menuBtnClose.addEventListener('click', () => toggleMenu(false));

// trapFocus забезпечує циклічний рух по елементам всередині меню при натисканні Tab/Shift+Tab
function trapFocus(e) {
  if (!mobileMenu.classList.contains('is-open')) return;

  const focusableElements = mobileMenu.querySelectorAll(
    'button, a, input, textarea, select',
  );

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      // Shift+Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  }

  if (e.key === 'Escape') {
    toggleMenu(false);
  }
}

// простий варіант з переключенням на доданий клас 'is-open'
// const toggleMenu = () => mobileMenu.classList.toggle('is-open');
// menuBtnOpen.addEventListener('click', toggleMenu);
// menuBtnClose.addEventListener('click', toggleMenu);

// а це варіант коли використовують атрибут 'aria-expanded'
// const menu = document.querySelector('.header__menu');
// const burger = document.querySelector('.header__burger');

// burger.addEventListener('click', () => {
//   const expanded = burger.getAttribute('aria-expanded') === 'true';
//   burger.setAttribute('aria-expanded', !expanded);
//   menu.classList.toggle('header__menu--open', !expanded);
// });
