const cols = document.querySelectorAll('.col');

// для перезапуску по натисканню клавіші пробілу
document.addEventListener('keydown', (event) => {
  event.preventDefault(); // щоб не мінявся замок по клавіші
  if (event.code.toLowerCase() === 'space') {
    setRandomColors();
  }
});

// для слухач глобальної події
document.addEventListener('click', (event) => {
  // потрібно визначити по якому елементу був зроблений клік
  const type = event.target.dataset.type;

  if (type === 'lock') {
    // щоб можна було робити клік як по самій іконці так і по полю кругом (кнопці)
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0];

    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickboard(event.target.textContent);
  }
});

// для копіювання кольору в hex-коді при кліку на текст заголовка h2
function copyToClickboard(text) {
  return navigator.clipboard.writeText(text); // може вернути Promis
}

/*Для підключення бібліотеки chroma.js (маленька zero-залежна JS бібліотека для різних видів робіт з кольором) на сайті
https://gka.github.io/chroma.js/ по ссилці https://cdnjs.com/libraries/chroma-js встановлюємо через CDN в файлі index.html 
Тобто, замість генерації самого кольору вручну, будемо використовувати цю бібліотеку використавши метод random() */

function setRandomColors(isInitial) {
  // спочатку, isInitial = underfined
  const colors = isInitial ? getColorsFromHash() : []; // якщо це початковий рендер, то взяти кольори

  cols.forEach((col, index) => {
    // визначити, якщо замочок зачинений, то не міняти колір колонки (її клас)
    const isLocked = col.querySelector('i').classList.contains('fa-lock'); // визначити чи є клас для зачиненого замочка

    const colorTitle = col.querySelector('h2'); // DOM-елемент текст
    const button = col.querySelector('button'); // DOM-елемент кнопка

    // якщо зміна кольору заблокована
    if (isLocked) {
      colors.push(colorTitle.textContent);
      return;
    }

    // якщо це перша загрузка сторінки, то потрібрий колір беремо з хеша, або генеруємо колір бібл chroma
    const color = isInitial
      ? colors[index] // яукщо це кольори по індексу
        ? colors[index] // беремо звідси значення потрібного кольору
        : chroma.random() // рандомно генеруємо колір
      : chroma.random(); // рандомно генеруємо колір

    // якщо зміна кольору не заблокована i це не є першою загрузкою
    if (!isInitial) {
      colors.push(color); // якщо зміна кольору не заблокована
    }

    colorTitle.textContent = color;
    col.style.background = color;

    setTextColor(colorTitle, color);
    setTextColor(button, color);
  });

  updateColorsHash(colors);
}

// для зміни кольору тексту якщо основний колір світлий і не видно букв тексту (коду в hex)
// вхідні параметри: text - DOM-елемент, color - поточний колір
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  // якщо luminance > 0.5 то колір шрифта тексту робити чорним
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}

// для можливості передачі обраних кольорів в мережу в хеші
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join('-');
}

// для перевірки чи є щось в хеші щоб потім кінечний користувач міг згенерувати кольлори з хеша
function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1) // забрати саму першу #
      .split('-') // переведем в масив
      .map((color) => '#' + color); // додаємо кожному кольору # та сам колір
  }
  return [];
}

setRandomColors(true); // берем кольора тільки при першій загрузці, бо потім будемо генерувати нові
