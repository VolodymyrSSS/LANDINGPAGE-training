const cols = document.querySelectorAll('.col');

// для генерації безпосередньо самого кольору
function generateRandomColor() {
  /* #FF0000 - червонийб №00FF00 - зелений №0000FF - синій RGB в 16й системі числення, тому треба генерувати 0123456789ABCDEF */
  const hexSymbols = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i++) {
    color += hexSymbols[Math.floor(Math.random() * hexSymbols.length)];
  }
  return '#' + color;
}

function setRandomColors() {
  cols.forEach((col) => {
    const hexText = col.querySelector('h2');
    const color = generateRandomColor();

    hexText.textContent = color;
    col.style.background = color;
  });
}

setRandomColors();
