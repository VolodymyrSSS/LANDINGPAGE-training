/* we used the <button> element, the click event will also be called when using 
the space and enter key to activate it.*/

// select all the theme buttons on the page
const themeSwitcher = document.querySelector('.theme-switcher'); // get the block where all theme buttons are placed
const buttons = themeSwitcher.querySelectorAll('button'); // get all the theme buttons in that block
const pressedButtonSelector = '[data-theme][aria-pressed="true"]'; // select the button that was previously defined as active
const defaultTheme = 'green'; // defined default theme

/*The way the aria-pressed and data-selected-theme are updated after loading the page and after clicking a button is more or less the same. So we can move this part into its own function*/
const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  document.documentElement.setAttribute('data-selected-theme', theme); // update the data-selected-theme property programatically

  document
    .querySelector(pressedButtonSelector)
    .setAttribute('aria-pressed', 'false');

  target.setAttribute('aria-pressed', 'true'); // set its aria-pressed attribute to 'true'
};

// create the handler for event listener
const handleThemeSelection = (event) => {
  const target = event.target; // target button on event
  const isPressed = target.getAttribute('aria-pressed'); // target the aria-pressed value
  const theme = target.getAttribute('data-theme'); // target the data-theme value

  if (isPressed !== 'true') {
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme); // save the user selected theme in the local storage
  }
};

const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme'); // get the theme stored in the local storage
  //  execute this code when the saved theme is different from the default theme
  if (savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
  }
};

setInitialTheme();

// looping through buttons and adding a click event listener to each of them
buttons.forEach((button) => {
  button.addEventListener('click', handleThemeSelection);
});
