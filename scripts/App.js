class App {
    constructor() {
        this.burgerMenu = new BurgerMenu;
        this.carousel = new DestinationsCarouselView(new DestinationsCarouselModel);
    }

    init() {
        this.burgerMenu.init();
        this.carousel.init();
    }
}