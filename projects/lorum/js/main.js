

// Menu btn hide and animation

const menuIcon = document.getElementById("menu-btn");
const lines = document.querySelectorAll(".no-animation");
let navigation = document.querySelector(".menu")

menuIcon.addEventListener("click", ()=> {
  menuIcon.classList.toggle("active");

  if (navigation.classList.contains('menu-list--closed')) {
    navigation.classList.remove('menu-list--closed');
    navigation.classList.add('menu-list--opened');
  } else {
    navigation.classList.add('menu-list--closed');
    navigation.classList.remove('menu-list--opened');
  }

  lines.forEach((line) => {
    line.classList.remove("no-animation");
  });
});

window.onscroll = () => {
  menuIcon.classList.remove("active");

  if (navigation.classList.contains('menu-list--closed')) {
    navigation.classList.remove('menu-list--closed');
    navigation.classList.add('menu-list--opened');
  } else {
    navigation.classList.add('menu-list--closed');
    navigation.classList.remove('menu-list--opened');
  }

  lines.forEach((line) => {
    line.classList.remove("no-animation");
  });

  lines.forEach((line) => {
    line.classList.remove("no-animation");
  });
};