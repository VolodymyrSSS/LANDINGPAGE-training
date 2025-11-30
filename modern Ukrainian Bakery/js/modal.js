const backdrop = document.querySelector('.backdrop');
const modalBtnClose = document.querySelector('.modal-btn-close');
const modalBtnOpen = document.querySelector('.modal-btn-open');

const toggleModal = () => backdrop.classList.toggle('is-hidden');

modalBtnClose.addEventListener('click', toggleModal);
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    // clicking outside the modal to close it
    toggleModal();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
    // clicking on ESC key to close it
    toggleModal();
  }
});

modalBtnOpen.addEventListener('click', toggleModal);
