// Mobile togle menu
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


// User login
var popup = document.querySelector(".modal-login");
var close = popup.querySelector(".modal-close");
var userName = popup.querySelector("[name=login]")

function userLoginShow() {
  // let loginWindow = document.getElementsByClassName("modal");
  // loginWindow[0].classList.add("modal-show");
  popup.classList.add("modal-show");
  userName.focus();
}

close.addEventListener("click", function () {
	popup.classList.remove("modal-show");
});