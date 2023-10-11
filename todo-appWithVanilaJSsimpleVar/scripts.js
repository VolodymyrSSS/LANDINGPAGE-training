// Select all elements
const form = document.getElementById('new-item-form');
const list = document.querySelector('#list');
const input = document.querySelector('#item-input');

// When I submit the form add a new element
form.addEventListener('submit', (e) => {
  e.preventDefault(); // not to page refresh

  // 1. create a new item
  const item = document.createElement('div'); // create div-element
  item.classList.add('list-item'); // assign a class
  item.innerText = input.value; // assigne entered value

  // 2. add item to the list
  list.appendChild(item);

  // 3. clear input
  input.value = '';

  // 4. set up event listener to delete item when clicked
  item.addEventListener('click', () => {
    list.removeChild(item); // or like: item.remove();
  });
});
