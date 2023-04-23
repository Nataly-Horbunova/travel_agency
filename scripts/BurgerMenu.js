class BurgerMenu {
    burgerMenu = document.querySelector('.header-nav-burger');
    navList = document.querySelector('.header-nav-list');
    menuOverlay = document.querySelector('.menu-overlay');

    toggleMenuList() {
        this.navList.classList.toggle('active');
        this.menuOverlay.classList.toggle('active');
    }

    init() {
        this.burgerMenu.addEventListener('click', () => this.toggleMenuList());
        this.menuOverlay.addEventListener('click', () => this.toggleMenuList());
    }
}