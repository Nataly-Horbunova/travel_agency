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
