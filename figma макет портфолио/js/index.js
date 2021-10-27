const burgerButton = document.querySelector('.burger-menu');
const burgerMenu = document.querySelector('.header__menu');
const personLanguage = document.querySelector('.person__language');


function addActive(element) {
    element.classList.toggle('_active');
}
function removeActive(element) {
    element.classList.remove('_active')
}


// Бургер меню
if (burgerButton) {
    burgerButton.addEventListener('click', e => {
        addActive(burgerButton);
        addActive(burgerMenu);
        addActive(personLanguage);
        document.body.classList.toggle('_lock');
    });
}


// Прокрутка по клику
const menuLinks = document.querySelectorAll('.menu__item[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        console.log(menuLinks)
        menuLink.addEventListener('click', e => {
            const menuLink = e.target;
            
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
            

                if (burgerMenu.classList.contains('_active')) {
                    removeActive(burgerButton);
                    removeActive(burgerMenu);
                    removeActive(personLanguage);
                    document.body.classList.remove('_lock');
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth'
                });
                e.preventDefault();
            }
        });
    });
}