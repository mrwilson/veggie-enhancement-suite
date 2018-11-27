export function setVegetarianState(state, doc = window.document) {

    [...doc.getElementsByClassName('product')].forEach((product) => {

        if(product.getElementsByClassName('vegetarian').length == 0) {
            if (state === 'only') {
                product.style.display = "none";
            }
        }
    });
};