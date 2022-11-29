const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnSearch = $('#search');
const inputSearch = $('#input-search');
const menu = $('#menu');
const main = $('#main');

const cardList = $('#card-list');
const cardFood = $('#card-food');
const btnMenu = $('#btn-menu');

const cart = $('#cart');
const cartBtn = $('#cart__icon');
const cartGroup = $('#cart-group');
const cartList = $('#cart-list');
const cartEmpty = $('#cart-empty');

const btnLogin = $('#btn-login');
const btnLoginMobile = $('#btn-login-mobile');
const btnRegister = $('#btn-register');

const overlay = $('.overlay');
const spinner = $('.spinner');

const model = $('#model');
const modelForm = $('.model__forms');
const modelFormLogin = $('.model__form-login');
const modelFormRegister = $('.model__form-register');
const modelBtnLogin = $$('.model__btn-login');
const modelBtnRegister = $$('.model__btn-register');
const btnOutForm = $$('#btn-out-form');

const header = $('#header');
const introduce = $('.home__introduce');
const bgScroll = $('#background-scroll');
const elementModal = $('.home__menu-modal');
const iconMobile = $('.header__icon-mobile');
const listMobile = $('.header__list-mobile');
const overlayMobile = $('.header__overlay-mobile');

var count = 0;
var count2 = 0;
function removeFoodCart(id) {
  // set lại mảng tăng 1 số lượng chứa id các sản phẩm
  if (arrQuantity.length != 0) {
    for (let j = 0; j < arrQuantity.length; j++) {
      if (arrQuantity[j] !== id) {
        count2 += 1;
      }
    }
    arrQuantity.splice(count2 - 1, count2);
    count2 = 0;
  }
  // set lại mảng chứa id sản phẩm để check sản phẩm
  if (checkFoodAdded.length != 0) {
    for (let j = 0; j < checkFoodAdded.length; j++) {
      if (checkFoodAdded[j] !== id) {
        count += 1;
      }
    }
    checkFoodAdded.splice(count - 1, count);
    count = 0;
  }
  document.querySelector(`.cart__item${id}`).remove();
  let valueCart = $('#cart-quantity');
  valueCart.innerHTML = `<p>${quantityCurrent - 1}</p>`;
  quantityCurrent -= 1;
  if (quantityCurrent === 0) {
    cartEmpty.style.display = 'block';
  }
}

// App food in cart list
var checkFoodAdded = [];
var checkArr = 0;
function addFoodCart({ name, thumbnail, id }) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart__item');
  cartItem.classList.add(`cart__item${id}`);

  cartItem.innerHTML = ` 
  <div class="cart__item-thumbnail">
    <img
      src="${thumbnail}"
      alt="${name}"
    />
  </div>  
  <div class="cart__item-content">
      <h5 class="cart__item--name">${name}</h5>
      <div class="cart__item-quantity">
        <p class="cart__item--price">${
          $('.home__menu-modal--price span').innerText
        }</p>
        </div>
  </div>
  <button
    class="cart__item--btn cart__item--trash" onclick = "removeFoodCart(${id})"
  >
    <i class="fa-solid fa-trash"></i>
  </button>
  `;
  if (checkFoodAdded.length == 0) {
    cartList.appendChild(cartItem);
    checkFoodAdded.push(id);
  } else {
    for (let i = 0; i < checkFoodAdded.length; i++) {
      if (checkFoodAdded[i] == id) checkArr += 1;
    }
    if (checkArr > 0) {
      $(`.cart__item${id}`).remove();
      cartList.appendChild(cartItem);
      checkArr = 0;
    } else {
      cartList.appendChild(cartItem);
      checkFoodAdded.push(id);
      checkArr = 0;
    }
  }
}

function getFoodId(id) {
  fetch(`https://6369c97228cd16bba72454be.mockapi.io/foods/${id}`)
    .then((res) => res.json())
    .then((data) => {
      addFoodCart(data);
    });
}

// hàm tăng thêm số lượng vao giỏ hàng
let quantityCurrent = 0;
let arrQuantity = [];
let checkCart = 0;
function cartAdd(id) {
  if ($('.home__modal-mount--input').value == '') {
    $('.home__modal-mount--input').value = 1;
  }
  if (arrQuantity.length === 0) {
    arrQuantity.push(id);
    let valueCart = $('#cart-quantity');
    valueCart.innerHTML = `<p>${quantityCurrent + 1}</p>`;
    quantityCurrent += 1;
  } else {
    // console.log(quantityCurrent);
    for (i = 0; i < arrQuantity.length; i++) {
      if (arrQuantity[i] === id) {
        checkCart += 1;
      }
    }
    if (checkCart !== 1) {
      arrQuantity.push(id);
      $('#cart-quantity').innerHTML = `<p>${quantityCurrent + 1}</p>`;
      quantityCurrent += 1;
    }
    checkCart = 0;
  }

  if (quantityCurrent > 0) {
    cartEmpty.style.display = 'none';
  }

  closeAndOpen();
  getFoodId(id);
}
// hàm giảm giá trị so luong
function decrease(price) {
  let valueInputMount = $('.home__modal-mount--input').value;
  let newPrice =
    parseFloat($('.home__menu-modal--price span').innerText.replace(/,/g, '')) -
    price;

  if (valueInputMount > 1) {
    $('.home__modal-mount--input').value = parseInt(valueInputMount) - 1;
    $('.home__menu-modal--price span').innerText = formatNumber(newPrice);
  }
}
// ham tăng giá trị số lượng
function increase(price) {
  let valueInputMount = $('.home__modal-mount--input').value;
  let newPrice = price * (parseInt(valueInputMount) + 1);

  if ($('.home__modal-mount--input').value == '')
    $('.home__modal-mount--input').value = 1;

  $('.home__modal-mount--input').value = parseInt(valueInputMount) + 1;
  $('.home__menu-modal--price span').innerText = formatNumber(newPrice);
}

function onblurInputMountModal(price) {
  let valueInputMount = $('.home__modal-mount--input').value;
  let newPrice = price * parseInt(valueInputMount);

  if ($('.home__modal-mount--input').value == '')
    $('.home__modal-mount--input').value = 1;

  $('.home__menu-modal--price span').innerText = formatNumber(newPrice);
}
//hàm trả về data home__menu-modal-- container
function modalContainer(name, desc, price, img, id, rate) {
  return `
          <div class="home__menu-modal--container">
            <div class="home__menu-modal--img">
              <img
                src="${img}"
                alt=""
              />
              <p class="home__menu-modal--desc">${desc}</p>
            </div>
            <div class="home__menu-modal--content">
              <p class="home__menu-modal--title">${name}</p>
              <div class="home__menu-modal--rate">
                <span class="span-title">${rate}.0</span>
                <div class="home__modal-rate--group">
                  <span class="fa fa-star" ></span>
                  <span class="fa fa-star" ></span>
                  <span class="fa fa-star" ></span>
                  <span class="fa fa-star" ></span>
                  <span class="fa fa-star" ></span>
                </div>
              </div>
              <div class="home__menu-modal--price">
                <span>${formatNumber(price)}</span>
              </div>
              <div class="home__menu-modal--amount">
                <p>Quantity</p>
                <div class="home__modal-amount">
                  <button class="home__modal-mount--decrease" onclick = "decrease(${price})">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input class="home__modal-mount--input" type="number" value="1" onblur="onblurInputMountModal(${price})"  min="1"
        oninput="validity.valid||(value='');"/>
                  <button class="home__modal-mount--increase" onclick ="increase(${price})">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="home__menu-modal--buy">
                <button class="home__menu-modal--addCart" onclick ="cartAdd('${id}')">
                  <img src="./assets/img/cart.svg" alt="Cart icon" />
                  <span>Add to cart</span>
                </button>
                <button class="home__menu-modal--buyNow">Buy Now</button>
              </div>
            </div>
            <div
              class="home__menu-modal--close" onclick = "closeAndOpen()";
            >
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>`;
}

// ham đóng va mở modal menu
function closeAndOpen() {
  elementModal.classList.toggle('open');
  overlay.classList.toggle('show');
}

//  hien thi modal-menu
function showModal(name, desc, price, img, id, rate) {
  elementModal.innerHTML = modalContainer(name, desc, price, img, id, rate);

  closeAndOpen();
  let test = $('.home__modal-rate--group').children;
  for (let i = 0; i < rate; i++) {
    test[i].classList.add('checked');
  }

  $('.home__modal-mount--input').onkeyup = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let newPrice = price * $('.home__modal-mount--input').value;
      $('.home__menu-modal--price span').innerText = formatNumber(newPrice);
    }
  };
}

function renderFood(arr) {
  arr.forEach(({ name, description, thumbnail, price, id, rate }, index) => {
    const cardFood = document.createElement('div');

    cardFood.classList.add(
      'home__card',
      'move-in-top',
      `delay-${(index += 1)}`
    );
    cardFood.setAttribute('food-id', id);
    cardFood.setAttribute('id', 'card-food');

    cardFood.innerHTML = `
          <div class="home__card-picture">
            <img src="${thumbnail}" alt="" />
            <button class="home__card--btn-more-cart" onclick ="showModal('${name}', '${description}', ${price},'${thumbnail}','${id}',${rate})">More</button>
          </div>
    
          <div class="home__card-content">
            <h5 class="home__card--name">${name}</h5>
            <p class="home__card--desc">${description}</p>
            <div class="home__card-bottom">
              <p id="card-price">${formatNumber(price)}</p>
              <span id="card-like" class="home__card-like"
                ><svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.9644 3.12862C8.29122 -2.54509 0.856934 0.545766 0.856934 6.72634C0.856934 11.3675 11.0489 18.6275 11.9644 19.5715C12.8861 18.6275 22.5712 11.3675 22.5712 6.72634C22.5712 0.592623 15.6444 -2.54509 11.9644 3.12862Z"
                    fill="#1D1D1D"
                    fill-opacity="0.7"
                  />
                </svg>
              </span>
            </div>
          </div>
    `;

    cardList.appendChild(cardFood);
    handleClickBtnLike();
  });
}

const listFood = [];
let start = 0;
let end = 4;

btnMenu.onclick = (e) => {
  e.preventDefault();
  start += 4;
  end += 4;
  loadingAPI(getFood);
};

// get food
function getFood() {
  fetch('https://6369c97228cd16bba72454be.mockapi.io/foods')
    .then((res) => res.json())
    .then((data) => {
      renderFood(data.slice(start, end));

      if (cardList.children.length === data.length) {
        btnMenu.onclick = (e) => {
          e.preventDefault();

          alert('Out of Data!!!!');
          btnMenu.onclick = null;
          btnMenu.classList.add('disable');
        };
      }
    })
    .catch((err) => console.log(err));
}
loadingAPI(getFood);

// Handle Click Btn Like
function handleClickBtnLike() {
  const btnLikes = $$('#card-like');

  btnLikes.forEach(
    (btnLike) =>
      (btnLike.onclick = (e) => {
        btnLike.classList.toggle('active');

        const foodId = e.target.closest('#card-food').getAttribute('food-id');

        console.log(foodId);
      })
  );
}

// Cart
cartBtn.onclick = () => {
  cart.classList.toggle('show');
  cartGroup.classList.toggle('show');

  // Check on screen mobile
  if (document.body.clientWidth <= 992) {
    overlay.classList.toggle('show');
  }

  if (iconMobile.classList.contains('active')) {
    iconMobile.classList.remove('active');
    listMobile.classList.remove('show');
    overlay.classList.add('show');
  }
};

cartGroup.onmouseleave = () => {
  cart.classList.remove('show');
  cartGroup.classList.remove('show');
};

//  Handle click btn search
btnSearch.onclick = (e) => {
  e.preventDefault();

  menu.classList.toggle('hide');
  inputSearch.classList.toggle('show');

  inputSearch.focus();
  inputSearch.value = '';
};

// Handle click btn sign in & up
btnLogin.onclick = () => {
  model.classList.toggle('show');
  overlay.classList.toggle('show');

  handleOpenLogin();
};

btnLoginMobile.onclick = () => {
  model.classList.toggle('show');

  if (iconMobile.classList.contains('active')) {
    iconMobile.classList.remove('active');
    listMobile.classList.remove('show');
  }

  handleOpenLogin();
};

btnRegister.onclick = () => {
  model.classList.toggle('show');
  overlay.classList.toggle('show');

  handleOpenRegis();
};

modelBtnLogin.forEach((btn) => (btn.onclick = handleOpenLogin));
modelBtnRegister.forEach((btn) => (btn.onclick = handleOpenRegis));

// Handle close model form
btnOutForm.forEach((btn) => (btn.onclick = hideModel));

function hideModel() {
  if (model.classList.contains('show')) {
    model.classList.remove('show');
    handleSwitchForm();
  }

  if (elementModal.classList.contains('open')) {
    elementModal.classList.remove('open');
  }

  overlay.classList.remove('show');
}

// Handle open model form
function handleOpenLogin() {
  modelForm.className = 'model__forms model__forms-active-login';
  modelFormLogin.style.display = 'flex';
  modelFormRegister.style.opacity = '0';
  modelFormRegister.style.visibility = 'hidden';

  setTimeout(function () {
    modelFormLogin.style.opacity = '1';
    modelFormLogin.style.visibility = 'visible';
  }, 400);

  setTimeout(function () {
    modelFormRegister.style.display = 'none';
    modelFormRegister.style.opacity = '0';
    modelFormRegister.style.visibility = 'hidden';
  }, 200);
}

function handleOpenRegis() {
  modelForm.className = 'model__forms model__forms-active-register';
  modelFormRegister.style.display = 'flex';
  modelFormLogin.style.opacity = '0';
  modelFormLogin.style.visibility = 'hidden';

  setTimeout(function () {
    modelFormRegister.style.opacity = '1';
    modelFormRegister.style.visibility = 'visible';
  }, 100);

  setTimeout(function () {
    modelFormLogin.style.display = 'none';
    modelFormLogin.style.opacity = '0';
    modelFormLogin.style.visibility = 'hidden';
  }, 400);
}

function handleSwitchForm() {
  modelForm.className = 'model__forms';
  modelFormRegister.style.opacity = '0';
  modelFormLogin.style.opacity = '0';
  modelFormLogin.style.visibility = 'hidden';
  modelFormRegister.style.visibility = 'hidden';

  setTimeout(function () {
    modelFormRegister.style.display = 'none';
    modelFormLogin.style.display = 'none';
  }, 500);
}

// Loading API
function loadingAPI(getAPI) {
  spinner.classList.add('show');
  overlay.classList.add('show');

  setTimeout(() => {
    spinner.classList.remove('show');
    overlay.classList.remove('show');

    setTimeout(() => getAPI(), 400);
  }, 1000);
}

// Format price
function formatNumber(num) {
  const numFormat = parseFloat(num).toFixed(0).split('');
  const numFormatLength = numFormat.length;

  let i = 0;
  for (i; i < numFormatLength; i += 3)
    numFormat.splice(numFormatLength - i, 0, ',');

  return `${numFormat.join('').slice(0, -1)} VND`;
}

// Handle scroll
window.onscroll = () => {
  header.classList.toggle('sticky', window.scrollY > 80);
  introduce.classList.toggle('change', window.scrollY > 80);
};

// Mobile
function displayMenuOnMobile() {
  iconMobile.classList.toggle('active');
  listMobile.classList.toggle('show');
  overlay.classList.toggle('show');

  if (document.body.clientWidth <= 992 && cart.classList.contains('show')) {
    cart.classList.remove('show');
    cartGroup.classList.remove('show');
    overlay.classList.add('show');
  }

  iconMobile.classList.contains('active')
    ? header.setAttribute('style', 'border-color: #ffffff;')
    : header.removeAttribute('style');
}

iconMobile.onclick = displayMenuOnMobile;

overlay.onclick = () => {
  overlay.classList.remove('show');

  if (iconMobile.classList.contains('active')) {
    iconMobile.classList.remove('active');
    listMobile.classList.remove('show');
  }

  if (document.body.clientWidth <= 992 && cart.classList.contains('show')) {
    cart.classList.remove('show');
    cartGroup.classList.remove('show');
  }

  if (model.classList.contains('show')) {
    model.classList.remove('show');
    handleSwitchForm();
  }

  if (elementModal.classList.contains('open')) {
    elementModal.classList.remove('open');
  }
};
