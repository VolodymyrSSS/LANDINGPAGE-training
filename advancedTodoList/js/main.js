// in order to add a new task, we need:

// 1) find a form element where input is placed
const form = document.querySelector('#form');

// 2) than, pick up an input element
const taskInput = document.querySelector('#taskInput');

// 6.1) define a plase where new generated markup should inserted
const tasksList = document.querySelector('#tasksList');

// 9.1) get the empty list block (with image and text)
const emptyList = document.querySelector('#emptyList');

// 3) hang on an eventListener to form to add a task
form.addEventListener('submit', function (event) {
  event.preventDefault(); // not to reload the page

  // 4) get a value from input
  const taskText = taskInput.value;

  // 5) create a markup for a new task in order to show it on a html-page
  const taskHTML = `
    <li class="list-group-item d-flex justify-content-between task-item">
      <span class="task-title">${taskText}</span>
      <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
          <img src="./img/tick.svg" alt="Done" width="18" height="18" />
        </button>
        <button type="button" data-action="delete" class="btn-action">
          <img src="./img/cross.svg" alt="Done" width="18" height="18" />
        </button>
      </div>
    </li>
  `;

  // 6) add generated markup on a page
  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  // 7) clear the input field
  taskInput.value = '';

  // 8) return a focus to input field
  taskInput.focus();

  // 9) remove an empty list block from the task list
  if (tasksList.children.length > 1) {
    emptyList.classList.add('none');
  }
});
