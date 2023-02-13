// 1) to add a new task: find a form element where input is placed
const form = document.querySelector('#form');

// 2) than, pick up an input element
const taskInput = document.querySelector('#taskInput');

// 4) define a plase where new generated markup should inserted
const tasksList = document.querySelector('#tasksList');

// 5) get the empty list block (with image and text)
const emptyList = document.querySelector('#emptyList');

// 3) hang on an eventListener to form
form.addEventListener('submit', addTask);

// 6) to delete the task: listen to the task list, cause any new task is generated there
tasksList.addEventListener('click', deleteTask);

// 7) in order to mark the task is compleated:
tasksList.addEventListener('click', doneTask);

// 8) check if in localStorege has any task
if (localStorage.getItem('tasksHTML')) {
  // if has task - get it from local storage by key
  tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

// create addTask function
function addTask(event) {
  event.preventDefault(); // not to reload the page

  const taskText = taskInput.value; // get a value from input

  // create a markup for a new task in order to show it on a html-page
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

  tasksList.insertAdjacentHTML('beforeend', taskHTML); // add generated markup on a page

  taskInput.value = ''; // clear the input field

  taskInput.focus(); // return a focus to input field

  // remove an empty list block to display when there is a task
  if (tasksList.children.length > 1) {
    emptyList.classList.add('none'); // apply DOM add method to the classList
  }

  saveHTMLtoLS(); // call func to save in localStorage
}

// create deleteTask function
function deleteTask(event) {
  // check if clicked button has NOT an attribute 'delete'
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node
  parentNode.remove(); // apply DOM remove method to node

  // add an empty list block to display when no tasks available
  if (tasksList.children.length === 1) {
    emptyList.classList.remove('none'); // apply DOM remove method to the classList
  }

  saveHTMLtoLS(); // call func to save changes in localStorage
}

// create doneTask function
function doneTask(event) {
  // check if clicked button has NOT an attribute 'done'
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node
  const taskTitle = parentNode.querySelector('.task-title'); // find the span-elemrnt
  taskTitle.classList.toggle('task-title--done'); // apply DOM toggle method to the classList

  saveHTMLtoLS(); // call func to save changes in localStorage
}

// save HTML to local storage - it is NOT CORRECT
function saveHTMLtoLS() {
  localStorage.setItem('tasksHTML', tasksList.innerHTML);
}
