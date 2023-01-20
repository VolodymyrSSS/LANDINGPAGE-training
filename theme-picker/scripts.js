/* we used the <button> element, the click event will also be called when using 
the space and enter key to activate it.*/

// select all the theme buttons on the page
const themeSwitcher = document.querySelector('.theme-switcher'); // get the block where all theme buttons are placed
const buttons = themeSwitcher.querySelectorAll('button'); // get all the theme buttons in that block

// create the handler for event listener
const handleThemeSelection = (event) => {
  const target = event.target; // target button on event
  const theme = target.getAttribute('data-theme'); // target the data-theme value
  //   const isPressed = target.getAttribute('aria-pressed'); // target the aria-pressed value
  document.documentElement.setAttribute('data-selected-theme', theme); // update the data-selected-theme property programatically

  // to change the state of the buttons when clicking a button, we need:
  const previouslyPressedButton = document.querySelector(
    '[data-theme][aria-pressed="true"]'
  ); // select the button that was still active
  previouslyPressedButton.setAttribute('aria-pressed', 'false'); // then set aria-pressed to 'false'
  target.setAttribute('aria-pressed', 'true'); // set its aria-pressed attribute to 'true',
};

// looping through buttons and adding a click event listener to each of them
buttons.forEach((button) => {
  button.addEventListener('click', handleThemeSelection);
});
