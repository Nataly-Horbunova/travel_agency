class DestinationsCarouselView {

    prevBtn = document.querySelector('.arrow-left');
    nextBtn = document.querySelector('.arrow-right');

    constructor(destinationsModel) {
        this.destinationsModel = destinationsModel;
    }


    slide() {
        const carouselInner = document.querySelector('.popular-destinations-cards-list');
        const carouselItems = document.querySelectorAll('.popular-destinations-card-item');
        const gap = window.getComputedStyle(carouselInner).gap;
        const cardWidth = carouselItems[0].offsetWidth;
        const visibleCarouselWidth = carouselInner.offsetWidth;
        const fullCarouselWidth = cardWidth * carouselItems.length + parseInt(gap) * (carouselItems.length - 1);
        const moveWidth = fullCarouselWidth / carouselItems.length;

        let position = 0;

        this.nextBtn.addEventListener('click', () => {
            if (position < (fullCarouselWidth - visibleCarouselWidth)) {
                position += moveWidth;
                carouselInner.style.transform = `translateX(${-position}px)`;
            }
        });

        this.prevBtn.addEventListener('click', () => {
            if (position > 0) {
                position -= moveWidth;
                carouselInner.style.transform = `translateX(${-position}px)`;
            }
        });
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
                this.slide();
            })
    }
}