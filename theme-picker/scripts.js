/* we used the <button> element, the click event will also be called when using 
the space and enter key to activate it. So we need:*/

// detect which button has been clicked

// to select all the theme buttons on the page
const themeSwitcher = document.querySelector('.theme-switcher'); // get the block where all theme buttons are placed
const buttons = themeSwitcher.querySelectorAll('button'); // get all the theme buttons in that block

// create the handler for event listener on button click
const handleThemeSelection = (event) => {
  //   console.log('button clicked', event.target); // 1 - detect which button has been clicked
  //   const theme = event.target.getAttribute('data-theme'); // 2 - target the data-theme value
  //   console.log(theme); // 2 - log the data-theme value
  const theme = event.target.getAttribute('data-theme');
  document.documentElement.setAttribute('data-selected-theme', theme); // 3 -update the data-selected-theme property programatically
};

// looping through buttons and adding a click event listener to each of them
buttons.forEach((button) => {
  button.addEventListener('click', handleThemeSelection);
});
