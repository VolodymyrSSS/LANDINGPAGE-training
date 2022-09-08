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

// відображення товарів
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
}

// дані з браузерної пам'яті
class Storage {}

// через це усе починається та усе пов'язує
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // отримуємо усі товари
  products.getProducts().then((products) => ui.displayProducts(products));
});
