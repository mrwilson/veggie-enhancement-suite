export class Products {

    constructor(element, loadProduct, isVegetarian) {
        this.element = element;
        this.all = loadProduct(element).map((product) => new Product(product, isVegetarian));
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

    constructor(element, isVegetarian) {
        this.element = element;
        this.isVegetarian = isVegetarian(element);
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