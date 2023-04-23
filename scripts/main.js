//  ====================== BURGER MENU ==========================

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
    }l
}


// ============================= CAROUSEL  =======================

class DestinationsCarouselModel {
    constructor() {
        this.destinations = '';
    }

    async getData() {
        await fetch('data.json')
            .then(response => response.json())
            .then(data => {
                this.destinations = data.destinations;
            });
    }
}

class DestinationsCarouselView {

    constructor(destinationsModel) {
        this.destinationsModel = destinationsModel;
    }

    createElem(tag, parent, classLists, attrs, text) {
        const el = document.createElement(tag);
        parent && parent.appendChild(el);

        if (classLists) {
            for (const classList of classLists) {
                el.classList.add(classList);
            }
        }

        if (attrs) {
            for (const attr of attrs) {
                el.setAttribute(attr.type, attr.value);
            }
        }

        if (text) {
            el.innerText = text;
        }
        return el;
    }

    renderCarousel() {
        const destinationsList = document.querySelector('.popular-destinations-cards-list');
        const mapOverlay = document.querySelector('.map-overlay');
        const mapWrapper = document.querySelector('.map-wrapper');

        const fragment = new DocumentFragment();

        this.destinationsModel.destinations.forEach((item) => {
            const li = this.createElem('LI', fragment, ['popular-destinations-card-item']);
            const imgWrapper = this.createElem('DIV', li, ['popular-destinations-card-img-wrapper']);
            this.createElem('IMG',
                imgWrapper,
                ['popular-destinations-card-img'],
                [
                    {type: 'src', value: `./assets/${item.imgSrc}`},
                    {type: 'alt', value: item.name}
                ]
            )

            const cardInfo = this.createElem('DIV', li, ['popular-destinations-card-info']);
            this.createElem('H3', cardInfo, ['popular-destinations-card-tittle'], null, item.name);
            this.createElem('P', cardInfo, ['popular-destinations-card-text'], null, item.description);
            this.createElem('DIV', cardInfo, ['popular-destinations-card-price'], null, `$${item.price}`);
            const map = this.createElem('DIV', cardInfo, ['popular-destinations-card-map'], null, 'See on map');

            map.addEventListener('click', () => {
                mapOverlay.classList.add('active');
                mapWrapper.innerHTML = item.mapIframe;
            })

            mapOverlay.addEventListener('click', () => mapOverlay.classList.remove('active'));
        });

        destinationsList.append(fragment);
    }


    init() {
        this.destinationsModel.getData()
            .then(() => {
                this.renderCarousel();
            })
    }
}





//  ================= APP ============
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

const app = new App;
app.init();


