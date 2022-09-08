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
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      } else {
        button.addEventListener('click', (event) => {
          event.target.innerText = 'In Cart';
          event.target.disabled = true;
        });
      }
    });
  }
}

// дані з браузерної пам'яті - localeStorage
class Storage {
  static saveProducts(products) {
    // встановлюємо пару ключ-значення, і при цьому значення перевод в JSON-формат
    localStorage.setItem('products', JSON.stringify(products));
  }
}

// через це усе починається та усе пов'язує
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

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
