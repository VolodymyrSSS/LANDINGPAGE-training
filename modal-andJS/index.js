let fruits = [
  {
    id: 1,
    title: 'apples',
    price: 20,
    img: 'https://gd.eppo.int/media/data/taxon/P/PHYPMA/pics/1024x0/1208.jpg',
  },
  {
    id: 2,
    title: 'oranges',
    price: 30,
    img: 'https://3sixtyfiveblog.files.wordpress.com/2017/11/orange-1995079_1920.jpg?w=1498',
  },
  {
    id: 3,
    title: 'mangoes',
    price: 40,
    img: 'https://cdn.shopify.com/s/files/1/0062/6022/8185/files/Mango_Tree_2_480x480.jpg?v=1614356479',
  },
];

/* ------ Dynamically render html part ------- */
const toHTML = (fruit) => `
  <div class="col">
    <div class="card">
      <img
        class="card-img-top"
        style="height:200px;"
        src="${fruit.img}"
        alt="${fruit.title}"
      />
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">find a Price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">decline fruit</a>
      </div>
    </div>
  </div>`;

function render() {
  const html = fruits.map((fruit) => toHTML(fruit)).join('');
  document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'The fruits price',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Close',
      color: 'primary',
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener('click', (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
    <p>The price for ${fruit.title} is: <strong>${fruit.price}$</strong> per 2lb</p>`);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.declineOrConfirm({
      title: 'Are you sure?',
      content: `
        <p>
          You are removing <strong>${fruit.title}</strong>!
        </p>`,
    })
      .then(() => {
        console.log(`The ${fruit.title} was removed`);
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log('cancel removing');
      });
  }
});
