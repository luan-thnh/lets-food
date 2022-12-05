const _$ = document.querySelector.bind(document);
const _$$ = document.querySelectorAll.bind(document);

const headerSearch = _$('#header__search');
const btnSearch = _$('#search');
const btnSearchMobile = _$('#search-mobile');
const inputSearch = _$('#input-search');
const menu = _$('#menu');
const main = _$('#main');

const cardList = _$('#card-list');
const cardFood = _$('#card-food');
const btnMenu = _$('#btn-menu');

const cart = _$('#cart');
const cartBtn = _$('#cart__icon');
const cartGroup = _$('#cart-group');
const cartList = _$('#cart-list');
const cartEmpty = _$('#cart-empty');

const btnLogin = _$('#btn-login');
const btnLoginMobile = _$('#btn-login-mobile');
const btnRegister = _$('#btn-register');

const overlay = _$('.overlay');
const spinner = _$('.spinner');

const modal = _$('#modal');
const modalForm = _$('.modal__forms');
const modalFormLogin = _$('.modal__form-login');
const modalFormRegister = _$('.modal__form-register');
const modalBtnLogin = _$$('.modal__btn-login');
const modalBtnRegister = _$$('.modal__btn-register');
const btnOutForm = _$$('#btn-out-form');

const formLogin = _$('#form-login');
const formRegister = _$('#form-register');
const emailLogin = _$('#email-login');
const passwordLogin = _$('#password-login');
const emailRegister = _$('#email-register');
const userRegister = _$('#user-register');
const passwordRegister = _$('#password-register');
const passwordConfirmRegister = _$('#password-confirm-register');
const btnLoginSubmit = _$('#login-submit');
const btnRegisterSubmit = _$('#register-submit');

const header = _$('#header');
const introduce = _$('.home__introduce');
const bgScroll = _$('#background-scroll');
const elementModal = _$('.home__menu-modal');
const iconMobile = _$('.header__icon-mobile');
const listMobile = _$('.header__list-mobile');
const overlayMobile = _$('.header__overlay-mobile');
const homeAboutSlide = _$('#home__about-slide');

const products = _$('#header__product');

const sections = _$$('section[id]');
const footer = _$('footer[id]');

// Render product when search
inputSearch.addEventListener('input', (e) => filterData(e.target.value));

const listItems = [];
function renderProductFood(arr) {
  arr.forEach(({ name, description, price, rate, thumbnail, id }) => {
    const productItem = document.createElement('div');
    productItem.setAttribute('class', 'header__product-item');
    listItems.push(productItem);

    productItem.innerHTML = `
		  <img src="${thumbnail}"  alt=""  />
      <div class="header__product-detail" onclick ="showModal('${name}', '${description}', ${price},'${thumbnail}','${id}',${rate})">
        <h4>${name}</h4>
        <p>${formatNumber(price)} VDN</p>
      </div>
        `;

    products.appendChild(productItem);
  });
}

function filterData(search) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
}

// Show input error message
const inputLogin = [emailLogin, passwordLogin];
const inputRegister = [
  userRegister,
  emailRegister,
  passwordRegister,
  passwordConfirmRegister,
];

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  formControl.classList.remove('success');
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add('success');
  formControl.classList.remove('error');
}

// Check email is valid
function checkEmail(input) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

// Get field name
function getFieldName(input) {
  const messError = input.id.charAt(0).toUpperCase() + input.id.slice(1);
  return messError.replace(/-register|-login/, '').replace(/-/g, ' ');
}

// Handle blur input form
inputLogin.forEach((input) => (input.onblur = checkFormLogin));
inputRegister.forEach((input) => (input.onblur = checkFormRegister));

// Handle click button submit form
btnLoginSubmit.onclick = checkFormLogin;
btnRegisterSubmit.onclick = checkFormRegister;

// Check form login
function checkFormLogin(e) {
  e.preventDefault();

  if (!checkRequired(inputLogin)) {
    checkLength(passwordLogin, 8, 25);
    checkEmail(emailLogin);
  }
}

// Check form register
function checkFormRegister(e) {
  e.preventDefault();

  if (!checkRequired(inputRegister)) {
    checkLength(userRegister, 3, 15);
    checkLength(passwordRegister, 8, 25);
    checkEmail(emailRegister);
    checkPasswordsMatch(passwordRegister, passwordConfirmRegister);
  }
}

// Handle star comments
function handleStarComments(arr) {
  const groupStarts = _$$('.home__comment-rate');

  groupStarts.forEach((groupStart, index) => {
    const groupStartArr = Array.prototype.slice
      .call(groupStart.children)
      .slice(0, arr[index].rate * 2);

    groupStartArr.forEach((star) => {
      if (star.classList.contains('home__comment-star--bolder'))
        star.classList.add('hide');

      if (star.classList.contains('home__comment-star--yellow'))
        star.classList.add('show');
    });
  });
}

// Render comments
function renderComments(arr) {
  homeAboutSlide.innerHTML = arr
    .map(
      ({ name, avatar, comment, rate }) => `
      <div class="home__about-comment">
      <div class="home__comment-user">
        <div class="home__comment-avatar">
          <img src="${avatar}" alt="" />
        </div>

        <div class="home__comment-right">
          <h5 class="home__comment-name">${name}</h5>
          <div class="home__comment-rate">
            <i
              class="home__comment-star home__comment-star--bolder fa-regular fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--yellow fa-solid fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--bolder fa-regular fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--yellow fa-solid fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--bolder fa-regular fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--yellow fa-solid fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--bolder fa-regular fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--yellow fa-solid fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--bolder fa-regular fa-star"
            ></i>
            <i
              class="home__comment-star home__comment-star--yellow fa-solid fa-star"
            ></i>
          </div>
        </div>
      </div>

      <p class="home__about-comment--desc">
        “${comment}”
      </p>
    </div>
  `
    )
    .join('');

  handleStarComments(arr);
}

// Get API comments
function getCommentsAPI() {
  fetch('https://6378bce27eb4705cf2733ca1.mockapi.io/comments')
    .then((res) => res.json())
    .then((data) => {
      renderComments(data);

      $(document).ready(function () {
        $('.home__about-slide').slick({
          autoplay: true,
          autoplaySpeed: 2000,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          draggable: true,
          arrows: false,
          dots: true,
        });
      });
    });
}

getCommentsAPI();

// Remove item food in cart
let count = 0;
let count2 = 0;
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

  _$(`.cart__item${id}`).remove();

  let valueCart = _$('#cart-quantity');

  valueCart.innerHTML = `<p>${quantityCurrent - 1}</p>`;
  quantityCurrent -= 1;
  if (quantityCurrent === 0) {
    cartEmpty.style.display = 'block';
  }
}

// App food in cart list
let checkFoodAdded = [];
let checkArr = 0;
function addFoodCart({ name, description, price, rate, thumbnail, id }) {
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
  <div 
    class="cart__item-content" 
    onclick ="showModal('${name}', '${description}', ${price},'${thumbnail}','${id}',${rate})">
      <h5 class="cart__item--name">${name}</h5>
      <div class="cart__item-quantity">
        <p class="cart__item--price">${
          _$('.home__menu-modal--price span').innerText
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

// Get API foods
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
  if (_$('.home__modal-mount--input').value == '') {
    _$('.home__modal-mount--input').value = 1;
  }
  if (arrQuantity.length === 0) {
    arrQuantity.push(id);
    let valueCart = _$('#cart-quantity');
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
      _$('#cart-quantity').innerHTML = `<p>${quantityCurrent + 1}</p>`;
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
  let valueInputMount = _$('.home__modal-mount--input').value;
  let newPrice =
    parseFloat(
      _$('.home__menu-modal--price span').innerText.replace(/,/g, '')
    ) - price;

  if (valueInputMount > 1) {
    _$('.home__modal-mount--input').value = parseInt(valueInputMount) - 1;
    _$('.home__menu-modal--price span').innerText = formatNumber(newPrice);
  }
}
// ham tăng giá trị số lượng
function increase(price) {
  let valueInputMount = _$('.home__modal-mount--input').value;

  if (_$('.home__modal-mount--input').value == '')
    _$('.home__modal-mount--input').value = 1;

  let newPrice = price * (parseInt(valueInputMount) + 1);
  _$('.home__modal-mount--input').value = parseInt(valueInputMount) + 1;
  _$('.home__menu-modal--price span').innerText = formatNumber(newPrice);
}

// Handle blur input mount modal
function onblurInputMountModal(price) {
  if (_$('.home__modal-mount--input').value == '')
    _$('.home__modal-mount--input').value = 1;

  let valueInputMount = _$('.home__modal-mount--input').value;
  let newPrice = price * parseInt(valueInputMount);
  _$('.home__menu-modal--price span').innerText = formatNumber(newPrice);
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
                <button class="home__menu-modal--buyNow" onclick = "showPopupUpdate()">Buy Now</button>
              </div>
            </div>
            <a href="#!"
              class="home__menu-modal--close" onclick = "closeAndOpen()";
            >
              <i class="fa-solid fa-xmark"></i>
            </a>
          </div>`;
}

// ham đóng va mở modal menu
function closeAndOpen() {
  elementModal.classList.toggle('open');
  overlay.classList.toggle('show');

  if (inputSearch.classList.contains('show')) overlay.classList.add('show');
}

//  hien thi modal-menu
function showModal(name, desc, price, img, id, rate) {
  elementModal.innerHTML = modalContainer(name, desc, price, img, id, rate);

  closeAndOpen();
  let test = _$('.home__modal-rate--group').children;
  for (let i = 0; i < rate; i++) {
    test[i].classList.add('checked');
  }

  _$('.home__modal-mount--input').onkeyup = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      let newPrice = price * _$('.home__modal-mount--input').value;
      _$('.home__menu-modal--price span').innerText = formatNumber(newPrice);
    }
  };

  if (document.body.clientWidth <= 992 && cart.classList.contains('show')) {
    cart.classList.remove('show');
    cartGroup.classList.remove('show');
    overlay.classList.toggle('show');
  }

  if (inputSearch.classList.contains('show')) overlay.classList.add('show');
}

// Render menu foods
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

// Handle click button more menu
const listFood = [];
let start = 0;
let end = 4;

btnMenu.onclick = (e) => {
  e.preventDefault();
  start += 4;
  end += 4;
  loadingAPI(getFood);
};

// Get API foods
function getFood() {
  fetch('https://6369c97228cd16bba72454be.mockapi.io/foods')
    .then((res) => res.json())
    .then((data) => {
      renderFood(data.slice(start, end));

      renderProductFood(data);

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

// Handle click button like
function handleClickBtnLike() {
  const btnLikes = _$$('#card-like');

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

  closeSearchInput('show');
};

cartGroup.onmouseleave = () => {
  cart.classList.remove('show');
  cartGroup.classList.remove('show');

  if (document.body.clientWidth <= 992) {
    overlay.classList.remove('show');
  }
};

//  Handle click btn search
function openSearchInput(e) {
  e.preventDefault();

  headerSearch.classList.toggle('show');
  inputSearch.classList.toggle('show');
  overlay.classList.toggle('show');
  products.classList.toggle('show');

  if (iconMobile.classList.contains('active')) {
    iconMobile.classList.remove('active');
    listMobile.classList.remove('show');
    overlay.classList.add('show');
  }

  if (modal.classList.contains('show')) {
    modal.classList.remove('show');
    overlay.classList.add('show');
  }

  inputSearch.focus();
}

function closeSearchInput(show) {
  if (inputSearch.classList.contains('show')) {
    headerSearch.classList.remove('show');
    inputSearch.classList.remove('show');
    products.classList.remove('show');
    inputSearch.children[0].value = '';
    overlay.classList.add(show || '');
  }
}

btnSearch.onclick = openSearchInput;
btnSearchMobile.onclick = openSearchInput;

// Handle click btn sign in & up
btnLogin.onclick = () => {
  modal.classList.toggle('show');
  overlay.classList.toggle('show');

  closeSearchInput('show');

  handleOpenLogin();
};

btnLoginMobile.onclick = () => {
  modal.classList.toggle('show');

  if (iconMobile.classList.contains('active')) {
    iconMobile.classList.remove('active');
    listMobile.classList.remove('show');
  }

  handleOpenLogin();
};

btnRegister.onclick = () => {
  modal.classList.toggle('show');
  overlay.classList.toggle('show');

  handleOpenRegis();
};

modalBtnLogin.forEach((btn) => (btn.onclick = handleOpenLogin));
modalBtnRegister.forEach((btn) => (btn.onclick = handleOpenRegis));

// Handle close modal form
btnOutForm.forEach((btn) => (btn.onclick = hideModal));

function hideModal() {
  if (modal.classList.contains('show')) {
    modal.classList.remove('show');
    handleSwitchForm();
  }

  if (elementModal.classList.contains('open')) {
    elementModal.classList.remove('open');
  }

  overlay.classList.remove('show');
}

// Handle open modal form
function handleOpenLogin() {
  modalForm.className = 'modal__forms modal__forms-active-login';
  modalFormLogin.style.display = 'flex';
  modalFormRegister.style.opacity = '0';
  modalFormRegister.style.visibility = 'hidden';

  setTimeout(function () {
    modalFormLogin.style.opacity = '1';
    modalFormLogin.style.visibility = 'visible';
  }, 400);

  setTimeout(function () {
    modalFormRegister.style.display = 'none';
    modalFormRegister.style.opacity = '0';
    modalFormRegister.style.visibility = 'hidden';

    modalFormRegister.querySelectorAll('input').forEach((input) => {
      input.parentElement.classList.remove('success', 'error');
      input.value = '';
    });
  }, 200);
}

function handleOpenRegis() {
  modalForm.className = 'modal__forms modal__forms-active-register';
  modalFormRegister.style.display = 'flex';
  modalFormLogin.style.opacity = '0';
  modalFormLogin.style.visibility = 'hidden';

  setTimeout(function () {
    modalFormRegister.style.opacity = '1';
    modalFormRegister.style.visibility = 'visible';
  }, 100);

  setTimeout(function () {
    modalFormLogin.style.display = 'none';
    modalFormLogin.style.opacity = '0';
    modalFormLogin.style.visibility = 'hidden';

    modalFormLogin.querySelectorAll('input').forEach((input) => {
      input.parentElement.classList.remove('success', 'error');
      input.value = '';
    });
  }, 400);
}

function handleSwitchForm() {
  modalForm.className = 'modal__forms';
  modalFormRegister.style.opacity = '0';
  modalFormLogin.style.opacity = '0';
  modalFormLogin.style.visibility = 'hidden';
  modalFormRegister.style.visibility = 'hidden';

  setTimeout(function () {
    modalFormRegister.style.display = 'none';
    modalFormLogin.style.display = 'none';
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

  navHighlighter();
};

const sectionsId = [...sections, footer];

function navHighlighter() {
  let scrollY = window.pageYOffset;

  sectionsId.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('#menu a[href*=' + sectionId + ']')
        .classList.add('active');
    } else {
      document
        .querySelector('#menu a[href*=' + sectionId + ']')
        .classList.remove('active');
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);

    entry.isIntersecting
      ? entry.target.classList.add('fade')
      : entry.target.classList.remove('fade');
  });
});

const hidesAll = _$$('.hide');
hidesAll.forEach((el) => observer.observe(el));

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

  closeSearchInput('show');

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

  if (modal.classList.contains('show')) {
    modal.classList.remove('show');
    handleSwitchForm();
  }

  if (elementModal.classList.contains('open')) {
    elementModal.classList.remove('open');
  }

  closeSearchInput();
};

// Home introduce parallax
_$('#home__introduce').onmousemove = (e) => {
  let x = (window.innerWidth - e.pageX * 2) / 90;
  let y = (window.innerHeight - e.pageY * 2) / 90;

  _$('#home__introduce-shape1').style.transform = `translate(${x}px, ${y}px)`;
  _$('#home__introduce-shape2').style.transform = `translate(${x}px, ${y}px)`;
  _$('#home__introduce-shape3').style.transform = `translate(${x}px, ${y}px)`;
  _$('#home__introduce-shape4').style.transform = `translate(${x}px, ${y}px)`;
  _$('#home__introduce-shape5').style.transform = `translate(${x}px, ${y}px)`;
  _$('#home__introduce-shape6').style.transform = `translate(${x}px, ${y}px)`;
};
