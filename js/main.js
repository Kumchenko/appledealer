const burger = document.querySelector('.header .menu__burger');
const menu = document.querySelector('.header .menu');
const menuList = document.querySelector('.header .menu__list');
const menuItems = menuList.querySelectorAll('.menu__item');

burger.addEventListener('click', () => {
    menu.classList.toggle('opened');
    document.body.classList.toggle('opened');
});

menuList.addEventListener('click', (e) => {
    console.log(e.target)
    if(e.target !== menuList) {
        menu.classList.remove('opened');
        document.body.classList.remove('opened');
    }
});

