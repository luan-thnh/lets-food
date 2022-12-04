const updating = _$('.updating');
const updatingTimes = _$('.updating__times');
const btnBuyCart = _$('.cart__btn button');
const btnBuyNows = _$$('.home__menu-modal--buyNow');
const inputFormLogins = _$$('#form-login input');
const inputFormRegisters = _$$('#form-register input');

btnLoginSubmit.onclick = (e) => {
  checkSuccessForm = [];

  inputFormLogins.forEach((input) => {
    if (input.parentElement.classList.contains('success'))
      checkSuccessForm.push(input.parentElement);
  });

  if (checkSuccessForm.length === inputFormLogins.length)
    updating.classList.add('show');
};

btnRegisterSubmit.onclick = (e) => {
  checkSuccessForm = [];

  inputFormRegisters.forEach((input) => {
    if (input.parentElement.classList.contains('success'))
      checkSuccessForm.push(input.parentElement);
  });

  if (checkSuccessForm.length === inputFormRegisters.length)
    updating.classList.add('show');
};

btnBuyCart.onclick = showPopupUpdate;

function showPopupUpdate() {
  updating.classList.add('show');

  if (document.body.clientWidth <= 992 && cart.classList.contains('show')) {
    cart.classList.remove('show');
    cartGroup.classList.remove('show');
    overlay.classList.remove('show');
  }
}

updatingTimes.onclick = (e) => {
  e.preventDefault();

  updating.classList.remove('show');
};
