import { Products } from '../products';

export class JustEatAdapter {

    constructor(doc) {
        this.products = this.loadProducts(doc);
    }

    loadProducts(doc) {
        return [...doc.getElementsByClassName('category')].map((products) =>
            new Products(
                products,
                this.loadProduct,
                this.isVegetarian
            )
        );
    }

    loadProduct(element) {
        return [...element.getElementsByClassName('product')];
    }

    isVegetarian(element) {
        return element.getElementsByClassName('vegetarian').length != 0;
    }

    updateState(state) {
        this.products.forEach((products) => products.updateState(state));
    }

}