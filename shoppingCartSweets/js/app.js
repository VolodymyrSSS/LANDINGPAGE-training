// показати корзину
(function () {
  const cartInfo = document.getElementById('cart-info');
  const cart = document.getElementById('cart');

  cartInfo.addEventListener('click', function () {
    cart.classList.toggle('show-cart');
  });
})();

// додати товар в корзину
(function () {
  const storeItemIcon = document.querySelectorAll('.store-item-icon');
  storeItemIcon.forEach(function (btnIcon) {
    btnIcon.addEventListener('click', function (event) {
      // тільки якщо клікнули по самій іконці, а не по зоні навкруги іконки
      if (event.target.parentElement.classList.contains('store-item-icon')) {
        /* потрібно по кліку передати картинку товару (точніше шлях до неїї в URL), найменування 
        товару, ціну, тому треба створити об'єкт із відповідними властивостями для передачі усього цього.
        Спочатку створюємо URL картинки товару, або шлях де лежить картинка беручи до уваги те, що батьківський 
        елемент "img-container" має 2 дочірних елемента: "store-img" та "store-item-icon", тому */
        let fullPath = event.target.parentElement.previousElementSibling.src;
        // в URL виділяємо ту частину де є тільки назва картинки тому видаляємо усю частину URL, яка стоїть перед назвою картинки
        let pos = fullPath.indexOf('img') + 3; // + 3 бо треба відкинути і позиції для 'img' також
        let partialPath = fullPath.slice(pos); // беремо усі символи від позиції 'pos' і до кінця

        // створюємо об'єкт із потрібними властивостями
        let item = {};
        // задаєм властивість для URL рухаючись від елемента - '<i class="fas fa-shopping-cart"></i>'
        item.img = `img-cart${partialPath}`; // 'img-cart' бо картинку передаємо в корзину маленьку, з папки 'img-cart'
        // задаєм властивість для найменування товару рухаючись від елемента - '<i class="fas fa-shopping-cart"></i>'
        let name =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[0].textContent;
        item.name = name; // присвоюємо значення властивості для найменувння товару
        // так само задаєм властивість для ціни товару рухаючись від елемента - '<i class="fas fa-shopping-cart"></i>'
        let price =
          event.target.parentElement.parentElement.nextElementSibling
            .children[0].children[1].textContent;
        // але треба позбутись знаку '$' та пробілу перед ціною, тому slice відкидаємо знак долара, а trim - відкидаємо пробіли:
        let finalPrice = price.slice(1).trim();
        item.price = finalPrice; // присвоюємо значення властивості для ціни товару
      }
    });
  });
})();
