// find a form element where input is placed
const form = document.querySelector('#form');

// pick up an input element
const taskInput = document.querySelector('#taskInput');

// define a plase where new generated markup should inserted
const tasksList = document.querySelector('#tasksList');

// get the empty list block (with image and text)
const emptyList = document.querySelector('#emptyList');

// create array to add tasks
let tasks = [];

// check if we have something in local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks')); // get the tasks as array
  tasks.forEach((task) => renderTask(task)); // than render each task on a page
}

// render available tasks on a page
// tasks.forEach(function (task) {
//   renderTask(task);
// });
// tasks.forEach((task) => renderTask(task));

// to show empty list element when start app
checkEmptyList();

// hang on an eventListener to form
form.addEventListener('submit', addTask);

// to delete the task: listen to the task list, cause any new task is generated there
tasksList.addEventListener('click', deleteTask);

// to mark the task- hang on an eventListener to tasks list
tasksList.addEventListener('click', doneTask);

// create addTask function
function addTask(event) {
  event.preventDefault(); // not to reload the page

  const taskText = taskInput.value; // get a value from input

  const newTask = {
    id: Date.now(), // get id as time in miliseconds
    text: taskText, // value of the task from input
    done: false, // status of the task
  };

  // add new task to the list
  // tasks.push(newTask); // classic way using array method push()
  tasks = [...tasks, newTask]; // better way - leave the array immutable

  // save array of tasks (with added one) into the local storage
  saveToLocalStorage();

  renderTask(newTask); // render new task

  taskInput.value = ''; // clear the input field

  taskInput.focus(); // return a focus to input field

  checkEmptyList(); // do NOT show empty list element when there is a task
}

// create deleteTask function
function deleteTask(event) {
  // check if clicked button has NOT an attribute 'delete'
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node

  // define id of the task to be removed and convert it to a Number
  const id = Number(parentNode.id);

  // remove element from the array using filter() method
  tasks = tasks.filter((task) => task.id !== id);

  // remove element from the markup
  parentNode.remove();

  // save the changed array of the tasks (without one being deleted) into the local storage
  saveToLocalStorage();

  checkEmptyList(); // show empty list element when there is NOT single task in the list
}

// create doneTask function
function doneTask(event) {
  // check if clicked button has NOT an attribute 'done'
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node

  // define id of the task to be marked and convert it to a Number
  const id = Number(parentNode.id);

  // find the task to be done using find() method and arrow function
  const task = tasks.find((task) => task.id === id);

  // mark the task as done
  task.done = !task.done; // get reversed value of the task status

  // save the changed status of the task in array into the local storage
  saveToLocalStorage();

  const taskTitle = parentNode.querySelector('.task-title'); // find the span-elemrnt
  taskTitle.classList.toggle('task-title--done'); // apply DOM toggle method to the classList
}

// create checkEmptyList function
function checkEmptyList() {
  // if tasks list is empty
  if (tasks.length === 0) {
    const emptyListHTML = `
      <li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
        <div class="empty-list__title">The task list is empty</div>
      </li>
    `;
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML); // insert generated markup on a page
  }

  // if single task is available
  if (tasks.length > 0) {
    // find the emptyList DOM element
    const emptyListEl = document.querySelector('#emptyList');
    // remove empty list block
    emptyListEl ? emptyListEl.remove() : null;
  }
}

// create saveToLocalStorage function
function saveToLocalStorage() {
  // save the array of tasks into the brauser's local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// create renderTask function
function renderTask(task) {
  // create css class to get the status of the class
  const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

  // create a markup for a new task in order to show it on a html-page
  const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${task.text}</span>
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

  tasksList.insertAdjacentHTML('beforeend', taskHTML); // insert generated markup on a page
}
