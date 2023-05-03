const burger = document.querySelector('header .menu__burger');
const menu = document.querySelector('header .menu');
burger.addEventListener('click', () => {
    menu.classList.toggle('opened');
    document.body.classList.toggle('opened');
});