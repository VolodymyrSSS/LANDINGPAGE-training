const cols = document.querySelectorAll('.col');

// для перезапуску по натисканню клавіші пробілу
document.addEventListener('keydown', (event) => {
  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
  }
});

/*Для підключення бібліотеки chroma.js (маленька zero-залежна JS бібліотека для різних видів робіт з кольором) на сайті
https://gka.github.io/chroma.js/ по ссилці https://cdnjs.com/libraries/chroma-js встановлюємо через CDN в файлі index.html 
Тобто, замість генерації самого кольору вручну, будемо використовувати цю бібліотеку використавши метод random() */

function setRandomColors() {
  cols.forEach((col) => {
    const colorTitle = col.querySelector('h2'); // DOM-елемент текст
    const button = col.querySelector('button'); // DOM-елемент кнопка
    const color = chroma.random();

    colorTitle.textContent = color;
    col.style.background = color;

    setTextColor(colorTitle, color);
    setTextColor(button, color);
  });
}

// для зміни кольору тексту якщо основний колір світлий і не видно букв тексту (коду в hex)
// вхідні параметри: text - DOM-елемент, color - поточний колір
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  // якщо luminance > 0.5 то колір шрифта тексту робити чорним
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

setRandomColors();
