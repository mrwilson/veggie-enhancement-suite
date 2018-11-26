
var products = document.getElementsByClassName('product');

var prods = [...products];

prods.forEach((product) => {
    if(product.getElementsByClassName('vegetarian').length == 0) {
        product.style.display = "none";
    }
});