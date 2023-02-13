// 1) to add a new task: find a form element where input is placed
const form = document.querySelector('#form');

// 2) than, pick up an input element
const taskInput = document.querySelector('#taskInput');

// 4) define a plase where new generated markup should inserted
const tasksList = document.querySelector('#tasksList');

// 5) get the empty list block (with image and text)
const emptyList = document.querySelector('#emptyList');

// create array to add tasks
let tasks = [];

// 3) hang on an eventListener to form
form.addEventListener('submit', addTask);

// 6) to delete the task: listen to the task list, cause any new task is generated there
tasksList.addEventListener('click', deleteTask);

// 7) in order to mark the task is compleated:
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

  // create css class to get the status of the class
  const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

  // create a markup for a new task in order to show it on a html-page
  const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
      <span class="${cssClass}">${newTask.text}</span>
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
}

// create deleteTask function
function deleteTask(event) {
  // check if clicked button has NOT an attribute 'delete'
  if (event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node

  // define id of the task to be removed and convert it to a Number
  const id = Number(parentNode.id);

  // find an index of the element in the array
  // const index = tasks.findIndex(function (task) {
  //   if (task.id === id) {
  //     return true; // return the index
  //   }
  //   // return task.id === id; // one-line solution
  // });
  // find index using arrow function
  const index = tasks.findIndex((task) => task.id === id);

  // remove an element from the array with defined index
  tasks.splice(index, 1);

  // remove element from the markup
  parentNode.remove();

  // add an empty list block to display when no tasks available
  if (tasksList.children.length === 1) {
    emptyList.classList.remove('none'); // apply DOM remove method to the classList
  }
}

// create doneTask function
function doneTask(event) {
  // check if clicked button has NOT an attribute 'done'
  if (event.target.dataset.action !== 'done') return;

  const parentNode = event.target.closest('.list-group-item'); // find the parent node
  const taskTitle = parentNode.querySelector('.task-title'); // find the span-elemrnt
  taskTitle.classList.toggle('task-title--done'); // apply DOM toggle method to the classList
}
