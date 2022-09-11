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
      let result = await fetch('products.json');
      let data = await result.json(); // отримати в json-форматі

      let products = data.items; // отримаємо властивість items з json-файла
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

// відображення товарів на сторінці
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
              <i class="fas fa-shopping-cart">add to bag</i>
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
  getAddToBagBtns() {
    const buttons = [...document.querySelectorAll('.bag-btn')]; // перетворюємо nodeList в Array за допомогою spred-operators
    buttonsDOM = buttons;
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
  setCartValues(cart) {
    let tempTotal = 0; // загальна вартість товарів в корзині
    let itemsTotal = 0; // заг кількість одиниць товару в корзині
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
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
  // функція відображення корзини
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  setupAPP() {
    cart = Storage.getCart(); // перевірка, чи є якісь значення в корзині та отримуємо її
    this.setCartValues(cart); // якщо в корзині є товари, то визначити параметри загальної вартості та загальної кількості
    this.populateCart(cart); // запускає якщо додаємо товар в корзину
    cartBtn.addEventListener('click', this.showCart); // по кліку показуємо корзину
    closeCartBtn.addEventListener('click', this.hideCart); // по кліку ховаємо корзину
  }
  // функція додавання товару в корзину
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  // функція приховання корзини
  hideCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
}

// дані з пам'яті браузера - localeStorage
class Storage {
  static saveProducts(products) {
    // встановлюємо пару ключ-значення, і при цьому значення перевод в JSON-формат
    localStorage.setItem('products', JSON.stringify(products));
  }
  static getProduct(id) {
    // спочатку отримуємо переведений в Array розпарсений список товарів
    let products = JSON.parse(localStorage.getItem('products'));
    // поветраємо той товар, який був обраний(знайдений) по його id
    return products.find((product) => product.id === id);
  }
  static saveCart(cart) {
    // встановлюємо пару ключ-значення, і значення переводимо в JSON-формат
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getCart() {
    // перевірка чи в корзині є якісь значення/товари чи нічого не має
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

// через це усе починається та усе пов'язує
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // запуск для доступу до усіх елементів DOM
  ui.setupAPP();

  // отримуємо усі товари
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products); // беремо товари з localeStorage як просто клас а не інстант, бо в методі є static, крім того, застосовуєм коли сторінка вже завантажиться
    })
    .then(() => {
      ui.getAddToBagBtns();
    });
});
