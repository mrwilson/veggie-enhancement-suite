export class Products {

    constructor(element) {
        this.element = element;
        this.all = [...element.getElementsByClassName('product')].map((product) => new Product(product));
        this.atLeastOneVegetarianProduct = this.all.filter((product) => product.isVegetarian).length > 0;
        this.allVegetarianProducts = this.all.filter((product) => product.isVegetarian).length == this.all.length;
    }

    updateState(state) {
        if (state == 'only' && !this.atLeastOneVegetarianProduct) {
            this.hide();
        } else if(state == 'exclude' && this.allVegetarianProducts) {
            this.hide();
        } else {
            this.show();
        }

        this.all.forEach((product) => product.updateState(state));
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = '';
    }
}

export class Product {

    constructor(element) {
        this.element = element;
        this.isVegetarian = element.getElementsByClassName('vegetarian').length != 0
    }

    updateState(state) {
        if (state == 'exclude' && this.isVegetarian || state == 'only' && !this.isVegetarian) {
            this.hide();
        } else {
            this.show();
        }
    }

    hide() {
        this.element.style.display = 'none';
    }

    show() {
        this.element.style.display = '';
    }

}