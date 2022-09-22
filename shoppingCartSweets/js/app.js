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

        // динамічно створюємо елемент корзини - одиниця товару
        const cartItem = document.createElement('div');
        // додаємо потрібні класи для одиниці товару
        cartItem.classList.add(
          'cart-item',
          'd-flex',
          'justify-content-between',
          'text-capitalize',
          'my-3'
        );
        // створюємо структуру одиниці товару на сторінці через innerHTML та зворотні лапки
        cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="img of sweet type" />
            <div class="item-text">
                <p id="cart-item-title" class="font-weight-bold mb-0">
                    ${item.name}
                </p>
                <span>$</span>
                <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id="cart-item-remove" class="cart-item-remove">
                <i class="fas fa-trash"></i>
            </a>
        `;
        // додаємо одиницю товару в корзину, для цього спочатку
        // визначаємо саму корзину куда буде вставлятись одиниця товару
        const cart = document.getElementById('cart');
        // визначаємо елемент корзини - поле для обчислення загальної ціни
        // це місце, перед яким потрібно вставити одиницю товару
        const total = document.querySelector('.cart-total-container');
        // вставляємо одиницю товару в місце перед полем загальної ціни
        cart.insertBefore(cartItem, total); // перший параметер - що хочемо вставити, другий - місце де вставл
        alert('Item has added to the cart'); // покажемо для контроля, що товар доданий в корзину
        showTotals(); // викликаємо функцію для підрахунку загальної вартості товару
      }
    });
  });

  // функція підрахунку загальної вартості товару в корзині
  function showTotals() {
    // визначаємо масив, куда будемо класти значення ціни від кожної одиниці товару
    const total = [];
    // визначаємо значення ціни для кожної одиниці товару для цього:
    // визначаємо одиниці товару від яких будемо брати значення ціни
    const items = document.querySelectorAll('.cart-item-price');
    // проходимось по усіх елементах масиву та берем textContent-ом значення ціни і додаєм його в масив
    items.forEach(function (item) {
      let takenPrice = item.textContent.slice(2).trim(); // відсікаєм $, переведення на інший рядок та усі пробіли
      total.push(parseFloat(takenPrice)); // переводимо в числовий тип бо takenPrice дає рядок символів
    });
    // обчислюємо загальну суму значень вартості кожного товару
    // тут total-як акумулятор item-як поточне значення
    const totalMoney = total.reduce(function (total, item) {
      total += item;
      return total;
    }, 0);
    // щоб брати тільки 2 значення числа після коми
    const finalMoney = totalMoney.toFixed(2);
    // відображаємо значення загальної суми товару в полі корзини
    document.getElementById('cart-total').textContent = finalMoney;
    // відображаємо значення загальної суми в полі наігації для корзини
    document.querySelector('.item-total').textContent = finalMoney;
    // відображаємо значення кількості доданих одиниць товару в полі наігації для корзини
    document.getElementById('item-count').textContent = total.length;
  }
})();
