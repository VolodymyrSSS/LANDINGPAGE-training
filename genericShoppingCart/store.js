/* Через те, що в файлі html-store у підключенні script було виставлено async
що означає асинхронну дію:  під час завантаження елеменів body, script вантажиться також
Отже, щоб мати доступ до елементів, необхідно щоб сторінка вже була завантажена, для цього задається умова: */
if (document.readyState == 'loading') {
  // чекати доки не завантажиться сторінка (елементи body)
  document.addEventListener('DOMContentLoaded', ready);
} else {
  // має доступ до елементів бо сторінка була вже завантажена
  ready();
}

function ready() {
  // отримаємо колекцію кнопок видалення з корзини по їх класу
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  // пройдемось по колекції та отримавши кнопку, навішаємо на неї подію
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]; // визначимо саму кнопку вартості
    button.addEventListener('click', removeCartItem); // навісили подію 'по-кліку'
  }

  // отримаємо колекцію кнопок вибору кількості в корзині по їх класу
  var quantityInputs = document.getElementsByClassName('cart-quantity-input');
  // пройдемось по колекції та отримавши кнопку, навішаємо на неї подію
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]; // визначимо саму кнопку кількості
    input.addEventListener('change', quantityChanged); // навісили подію 'по-зміні'
  }

  // отримаємо колекцію кнопок додавання в корзину по їх класу
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  // пройдемось по колекції та отримавши саму кнопку, навішаємо на неї подію
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]; // визначимо саму кнопку додавання в корзину
    button.addEventListener('click', addToCartClicked); // навісили подію 'по-кліку'
  }

  // для функціоналу купівлі, отримаємо кнопку купівлі та навішуємо на неї подію
  document
    .getElementsByClassName('btn-purchase')[0]
    .addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  // очищаємо корзину від придбаних товарів, спочатку отримаємо місце в корзині
  var cartItems = document.getElementsByClassName('cart-items')[0];
  // проходимось по усіх елементах корзини та видаляємо в ній усі дочірні елементи
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal(); // також обнуляєм поле загальної вартості після видалення}
}

function removeCartItem(event) {
  buttonClicked = event.target; // визначимо ту кнопку, по якій був клік
  // видаляємо кнопку з цілого ряда, бо вона в ряді має два батьківських елемента
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal(); // також обновляєм загальну вартість після видалення товару
}

function quantityChanged(event) {
  var input = event.target; // визначимо той input, який був натиснутий
  // перевірка на нечисло та від'ємне значення чи нуль
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1; // найменше число яке буде в полі кількості якщо 0 чи -1,-2...
  }
  updateCartTotal(); // також обновляєм загальну вартість після зміни кількості товару
}

function addToCartClicked(event) {
  var button = event.target; // визначимо ту кнопку, по якій був клік
  var shopItem = button.parentElement.parentElement; // отримати батьківський елемент, який містить усі потрібні поля для товару: name, img, price
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText; // отримати значення назви
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText; // отримати значення ціни
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src; // отримати посилання/url на зображення в атрибуті src
  addItemToCart(title, price, imageSrc); // додаємо товар в корзину функцією
  updateCartTotal(); // також обновляєм загальну вартість після додавання товару в корзину
}

// для додавання товару в кошик потрібно створити цілий ряд у який передати параметри title, price, image
function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div'); // створюємо html-елемент (ряд доданого товару, який містить потрібні значення)
  // додаємо стилі до створеного html-елементу
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-items')[0]; // визначаєм місце в корзині куди додати ряд з доданим товаром
  // у разі, якщо ми додаємо до корзини товар з тою самою назвою, то попередження
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart');
      return;
    }
  }
  // потрібно створити точну копію (шаблон) блока з полями товару  через косі лапки
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img
            class="cart-item-image"
            src="${imageSrc}"
            width="100"
            height="100"
        />
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1" />
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `;
  cartRow.innerHTML = cartRowContents; // передаємо html-елемент-шаблон як контент
  cartItems.append(cartRow); // додаємо ряд в кінець блока товарів кошика

  // через те, що додали цей елемент після того, як сторінка була завантажена на початку,
  // кнопки видалення та поле введення кількості немає в доданому елемені, тому
  // потрібно кнопку видалення та поле введення кількості знайти спочатку та навішати на них відповідну подію
  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', removeCartItem);
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
}

// треба пройтись по усіх рядах, знайти вартість і помножити на кількість та відобразити
function updateCartTotal() {
  // спочатку знаходимо в цілому документі місце де є корзина та берем перший елемент
  // бо потрібно взяти тільки той де є ряди з ціною і кількістю, інші не потрібні
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  //  визначаємо місце в самій корзині - де є ряди з ціною та кількістю
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0; // для обчислення загальної вартості в корзині
  // далі проходимось по елементам цього місця - по рядам
  for (var i = 0; i < cartRows.length; i++) {
    // визначаємо конкретний ряд, в якому містяться ціна та кількість
    var cartRow = cartRows[i];
    // визначаємо місце з ціною, і беремо перший її елемент
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    // визначаємо місце з кількістю, і беремо перший її елемент
    var quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];
    // визначаємо отримання значення ціни перевівши в число та забравши знак долара
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    // визначаємо отримання значення кількості взявши до уваги що це input який має value
    var quantity = quantityElement.value;
    // визначаємо отримання загальної вартості
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100; // округляємо до двох знаків після коми
  // для відображ заг вартості знайдем в документі клас, візьмем перший елемент та його
  // текст i присвоїмо йому значення загальної вартості додавши знак долара попереду
  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
}
