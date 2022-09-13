// get the client library
var client = contentful.createClient({
  // It needed an API key and a space ID to initialize a client
  space: 'n6uh6zfvi8dp',
  accessToken: 'Gxwo5_OTqQSZ_T8yOY3dLna3Kj2RwFzSoakP5_XnGj4',
});

// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');
// const btns = document.querySelectorAll('.bag-btn'); // тут отримуємо nodeList

let cart = [];
let buttonsDOM = [];

// отримання товарів локально (з products.json файлу)
class Products {
  async getProducts() {
    try {
      /* entry_id = '4LLx7NUJCN9XyjN2sH0EDk' В Content Model закладці знаходимо в правій половині вікна розділ де в полі  CONTENT TYPE ID, це {'comfyHouseProducts'}*/
      let contentful = await client.getEntries({
        content_type: 'comfyHouseProducts',
      });
      console.log(contentful);

      let products = contentful.items; // отримаємо властивість items з json-файла CMS Contentful

      //   let result = await fetch('products.json'); // отримання з локальної машини
      //   let data = await result.json(); // отримати в json-форматі локальної машини
      //   let products = data.items; // отримаємо властивість items з json-файла локальної машини
      // отримати значення полів з структури json-файла
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// відображення/рендерінг товарів на сторінці
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach((product) => {
      result += `
        <!-- single product-->
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt="product"
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <i class="fas fa-shopping-cart">add to cart</i>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        <!-- end of single product-->
        `;
    });
    productsDOM.innerHTML = result;
  }
  getAddToCartBtns() {
    const buttons = [...document.querySelectorAll('.bag-btn')]; // перетворюємо nodeList в Array за допомогою spred-operators
    buttonsDOM = buttons; // присвоїли усі кнопки, які є в додатку масиву buttonsDOM
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      // перевірка чи товар вже був доданий в корзину
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }
      // додаємо товар в корзину і відображаємо все, що в корзині
      button.addEventListener('click', (event) => {
        event.target.innerText = 'In Cart';
        event.target.disabled = true;
        // отримати обраний товар зі списку усіх товарів (через spred) по його id
        // також, додатково взяли властивість amount із присвоєним значенням '1'
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        // додати обраний товар в корзину
        cart = [...cart, cartItem];
        // зберігаємо корзину з доданими товарами в localStorage
        Storage.saveCart(cart);
        // в корзині - визначення загальної вартості та загальної кількості товарів
        this.setCartValues(cart);
        // в корзині - відобразити доданий товар (add item to the DOM)
        this.addCartItem(cartItem);
        // відобразити усю корзину
        this.showCart();
      });
    });
  }
  // функція підрахунку загальної вартості та загальної кількості товарів в корзині
  setCartValues(cart) {
    let tempTotal = 0; // загальна вартість товарів в корзині
    let itemsTotal = 0; // заг кількість одиниць товару(кругляшок корзини)
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  // функція динамічного створення одиниці товару та відображення/додавання в корзинy
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
                <img src=${item.image} alt="product" />
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>
            `;
    cartContent.appendChild(div);
  }
  // під-функція відображення самої корзини
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  setupAPP() {
    cart = Storage.getCart(); // перевірка, чи є якісь значення в корзині та отримуємо її
    this.setCartValues(cart); // якщо в корзині є товари, то визначити параметри загальної вартості та загальної кількості(кругляшок корзини)
    this.populateCart(cart); // додаємо товар в корзину
    cartBtn.addEventListener('click', this.showCart); // показуємо корзину
    closeCartBtn.addEventListener('click', this.hideCart); // ховаємо корзину
  }
  // під-функція додавання товару в корзину
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  // під-функція приховання корзини
  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  // функція запуску логіки дій з одиницями товару в середині корзини
  cartLogic() {
    // очистка усієї корзини
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });
    // збільшення/зменшення/видалення одиниць товару в середині корзини
    cartContent.addEventListener('click', (event) => {
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target; // отримаємо подію
        let id = removeItem.dataset.id; // отримаємо id
        cartContent.removeChild(removeItem.parentElement.parentElement); // видаляємо з DOM
        this.removeItem(id); // видаляємо по id
      } else if (event.target.classList.contains('fa-chevron-up')) {
        let increaseAmount = event.target; // отримаємо подію
        let id = increaseAmount.dataset.id; // отримаємо id
        let tempItem = cart.find((item) => item.id === id); // створюєм проміжне значення що буде братись для обчислень
        tempItem.amount = tempItem.amount + 1; // збільшуємо кількість
        Storage.saveCart(cart); // обновлюємо кількість в пам'яті браузера
        this.setCartValues(cart); // обновляємо кількість в полях корзини загальної вартості та загальної кількості(кругляшок корзини)
        increaseAmount.nextElementSibling.innerText = tempItem.amount; // обновляємо кількість в полі самої одиниці товару корзини
      } else if (event.target.classList.contains('fa-chevron-down')) {
        let decreaseAmount = event.target; // отримаємо подію
        let id = decreaseAmount.dataset.id; // отримаємо id
        let tempItem = cart.find((item) => item.id === id); // створюєм проміжне значення що буде братись для обчислень
        tempItem.amount = tempItem.amount - 1; // зменшуємо кількість
        if (tempItem.amount > 0) {
          Storage.saveCart(cart); // обновлюємо кількість в пам'яті браузера
          this.setCartValues(cart); // обновляємо кількість в полях корзини загальної вартості та загальної кількості(кругляшок корзини)
          decreaseAmount.previousElementSibling.innerText = tempItem.amount; // обновляємо кількість в полі самої одиниці товару корзини
        } else {
          cartContent.removeChild(decreaseAmount.parentElement.parentElement); // видаляємо з DOM
          this.removeItem(id); // видаляємо по id
        }
      }
    });
  }
  // підфункція очистки всієї корзини
  clearCart() {
    // отримати усі одиниці товару по їх id (це масив з id)
    let cartItems = cart.map((item) => item.id);
    // проходимось по цьому масиву та видаляємо товар по його іd
    cartItems.forEach((id) => this.removeItem(id));
    // видаляємо також з DOM
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart(); // і в кінці ховаємо корзину
  }
  // підфункція видалення товару з корзини
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id); // видаляємо товар
    this.setCartValues(cart); // видаляємо загальну вартість та кількість
    Storage.saveCart(cart); // записуємо очищену корзину в localStorage
    // перезапис назви кнопки з "IN CART" на "ADD TO CART"
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
  }
  // підфункція отримання кнопки по її id
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

// дані з пам'яті браузера - localeStorage
class Storage {
  static saveProducts(products) {
    // встановлюємо пару ключ-значення та переведення в JSON-формат
    localStorage.setItem('products', JSON.stringify(products));
  }
  static getProduct(id) {
    // отримуємо переведений в Array розпарсений список товарів
    let products = JSON.parse(localStorage.getItem('products'));
    // поветраємо той товар, який був обраний(знайдений) по його id
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    // встановлюємо пару ключ-значення та переведення в JSON-формат
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    // отримання корзини з одночасною перевіркою чи є в корзині якісь значення/товари чи нічого не має
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

// запуск усього функціоналу додавання товарів в корзину
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // функція запуску доступу до усіх елементів DOM
  ui.setupAPP();

  // отримуємо усі товари
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products); // беремо товари з localeStorage як просто клас а не інстант, бо в методі є static, крім того, застосовуєм коли сторінка вже завантажиться
    })
    .then(() => {
      ui.getAddToCartBtns();
      ui.cartLogic();
    });
});
