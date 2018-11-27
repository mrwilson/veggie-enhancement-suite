export function setVegetarianState(state, doc = window.document) {

    [...doc.getElementsByClassName('product')].forEach((product) => {

        if(state == 'only') {
            product.style.display = isVegetarian(product) ? '' : 'none';
        } else if (state == 'exclude') {
            product.style.display = isVegetarian(product) ? 'none' : '';
        } else if (state == 'include') {
            product.style.display = '';
        }
    });
};

function isVegetarian(product) {
    return product.getElementsByClassName('vegetarian').length != 0;
}