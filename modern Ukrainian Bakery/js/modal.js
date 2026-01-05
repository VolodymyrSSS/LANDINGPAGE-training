// версія відкриття модального вікна для одної кнопки
// const backdrop = document.querySelector('.backdrop');
// const modal = document.querySelector('.modal');
// const modalBtnClose = document.querySelector('.modal-btn-close');
// const modalBtnOpen = document.querySelector('.modal-btn-open');

// const toggleModal = () => backdrop.classList.toggle('is-hidden');

// modalBtnClose.addEventListener('click', toggleModal);
// backdrop.addEventListener('click', event => {
//   if (event.target === backdrop) {
//     // clicking outside the modal to close it
//     toggleModal();
//   }
// });
// document.addEventListener('keydown', event => {
//   if (event.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
//     // clicking on ESC key to close it
//     toggleModal();
//   }
// });
// modalBtnOpen.addEventListener('click', toggleModal);

// версія відкриття модального вікна для усіх кнопок де присутній клас modal-btn-open
const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const btnOpenList = document.querySelectorAll('.modal-btn-open');
const btnClose = document.querySelector('.modal-btn-close');

// const toggleModal = () => {
//   backdrop.classList.toggle('is-hidden');
// };

// // навішування слухача на усі елементи, які мають клас modal-btn-open
// btnOpenList.forEach(btn => {
//   btn.addEventListener('click', toggleModal);
// });

// btnClose.addEventListener('click', toggleModal);

// backdrop.addEventListener('click', e => {
//   if (e.target === backdrop) {
//     toggleModal(); // клік по будь-якому місці поля backdrop для закриття
//   }
// });

// document.addEventListener('keydown', e => {
//   const isOpen = !backdrop.classList.contains('is-hidden');
//   if (e.key === 'Escape' && isOpen) {
//     toggleModal(); // клік по кнопці ESC для закриття модального вікна
//   }
// });

// версія з професійним підходом разом з focus trap, scroll lock, return focus, Escape, backdrop click

// об"явлення змінної для елементу де знаходиться фокус
let lastFocusedElement = null;

// Допоміжна функція яка визначає стан коли модВікно є відкритим
const isModalOpen = () => !backdrop.classList.contains('is-hidden');

// функція яка завжди відкриває модВікно
const openModal = () => {
  // збереження елементу який відкриває модВікно
  lastFocusedElement = document.activeElement;

  // функція показу модВікна
  backdrop.classList.remove('is-hidden');

  // Блокування scroll - при русі по модВікні скрол не діє
  document.body.style.overflow = 'hidden';

  // Фокусування на самому модВікні та переміщення фокусу всередину модВікна
  modal.setAttribute('tabindex', '-1');
  modal.focus();

  // Слідкування за переміщенням focus
  document.addEventListener('keydown', trapFocus);
};

// функція яка завжди закриває модВікно
const closeModal = () => {
  // функція ховання модВікна
  backdrop.classList.add('is-hidden');

  // Відновлення можливості scroll
  document.body.style.overflow = '';

  // Повернення focus назад до елементу який відкривав модВікно
  if (lastFocusedElement) lastFocusedElement.focus();

  // відміна за слідкуванням focus
  document.removeEventListener('keydown', trapFocus);
};

// додавання слухача до усіх елементів з класом, що відкривають модВікно
btnOpenList.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// навішування слухача на кнопку Close
btnClose.addEventListener('click', closeModal);

// навішування слухача на клік закривання по полю backdrop
backdrop.addEventListener('click', e => {
  if (e.target === backdrop) closeModal();
});

// Кнопка Escape закриває модВікно
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && isModalOpen()) closeModal();
});

// функція працює тільки з фокусом, слідкування за Focus
function trapFocus(e) {
  if (!isModalOpen()) return;

  const focusable = modal.querySelectorAll(
    'button, a, input, textarea, select',
  );

  if (!focusable.length) return;

  const firstEl = focusable[0];
  const lastEl = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      // Shift + Tab
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
}
