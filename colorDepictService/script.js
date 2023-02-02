const cols = document.querySelectorAll('.col');

/*Для підключення бібліотеки chroma.js (маленька zero-залежна JS бібліотека для різних видів робіт з кольором) на сайті
https://gka.github.io/chroma.js/ по ссилці https://cdnjs.com/libraries/chroma-js встановлюємо через CDN в файлі index.html 
Тобто, замість генерації самого кольору вручну, будемо використовувати цю бібліотеку використавши метод random() */

function setRandomColors() {
  cols.forEach((col) => {
    const hexText = col.querySelector('h2');
    const color = chroma.random();

    hexText.textContent = color;
    col.style.background = color;
  });
}

setRandomColors();
