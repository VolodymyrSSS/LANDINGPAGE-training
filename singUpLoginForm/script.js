const singUpBtn = document.querySelector('.singupBtn');
const logInBtn = document.querySelector('.loginBtn');
const moVeBtn = document.querySelector('.moveBtn');
const singUp = document.querySelector('.singup');
const logIn = document.querySelector('.login');

logInBtn.addEventListener('click', () => {
  moVeBtn.classList.add('slideBtn');
  logIn.classList.add('loginForm');
  singUp.classList.remove('singupForm');
  moVeBtn.innerHTML = 'Login';
});

singUpBtn.addEventListener('click', () => {
  moVeBtn.classList.remove('slideBtn');
  logIn.classList.remove('loginForm');
  singUp.classList.add('singupForm');
  moVeBtn.innerHTML = 'Singup';
});
