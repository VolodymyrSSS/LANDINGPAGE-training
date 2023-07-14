// 1. selects all elements
const modal = document.querySelector('#modal');
const openModalButton = document.querySelector('#open-modal-btn');
const closeModalButton = document.querySelector('#close-modal-btn');
const overlay = document.querySelector('#overlay');
let greetings = document.querySelector('.greetings');

// event listener on click add class 'open' and opens modal
openModalButton.addEventListener('click', () => {
  modal.classList.add('open');
  overlay.classList.add('open');
});

// event listener on click remove class 'open' and close modal
closeModalButton.addEventListener('click', () => {
  //   modal.classList.remove('open');
  //   overlay.classList.remove('open');
  closeModal();
});

// event listener on click somewhere on overlay area colse modal as well
overlay.addEventListener('click', () => {
  //   modal.classList.remove('open');
  //   overlay.classList.remove('open');
  closeModal();
});

// create a function to unite functionality of previous ones
function closeModal() {
  modal.classList.remove('open');
  overlay.classList.remove('open');
}

const greetingsList = ['Good Morning', 'Good Afternoon', 'Good Evening'];
const currentHour = new Date().getHours();
// determine the index of the appropriate greetingsList based on the current hour
let index =
  currentHour >= 12 && currentHour < 17 ? 1 : currentHour >= 17 ? 2 : 0;
console.log(greetingsList[index]);
