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
  // отримаємо колекцію з двох кнопок по їх класу
  var removeCartItemButtons = document.getElementsByClassName('btn-danger');
  // пройдемось по колекції та отримавши кнопку навішаємо на неї подію
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]; // визначимо саму кнопку
    button.addEventListener('click', removeCartItem);
  }
}

function removeCartItem(event) {
  buttonClicked = event.target; // визначимо ту кнопку, яка була натиснута
  // видаляємо кнопку з цілого ряда, бо вона в ряді має два батьківських елемента
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal(); // також обновляєм загальну кількість після видалення
}

// треба пройтись по усіх рядах, знайти вартість і помножити на кількість та відобразити
function updateCartTotal() {
  var total = 0; // для обчислення загальної вартості в корзині
  // спочатку знаходимо в цілому документі місце де є корзина та берем перший елемент
  // бо потрібно взяти тільки той де є ряди з ціною і кількістю, інші не потрібні
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  //  визначаємо місце в самій корзині - де є ряди з ціною та кількістю
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
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
  // для відображ заг вартості знайдем в документі клас, візьмем перший елемент та його
  // текст i присвоїмо йому значення загальної вартості додавши знак долара попереду
  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
}
