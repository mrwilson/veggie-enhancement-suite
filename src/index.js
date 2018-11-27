export function setVegetarianState(state, doc = window.document) {

    [...doc.getElementsByClassName('product')].forEach((product) => {

        if(product.getElementsByClassName('vegetarian').length == 0 && state == 'only') {
            product.style.display = 'none';
        } else if (product.getElementsByClassName('vegetarian').length != 0 && state == 'exclude') {
            product.style.display = 'none';
        } else {
            product.style.display = '';
        }
    });
};