import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { Products, Product } from './products';

describe('Products', () => {

    it('should parse products section into Products object', () => {
        let dom = new JSDOM(`
          <!DOCTYPE html>
          <head></head>
          <body>
              <div class="category" id="at-least-one-option">
                  <div class="products">
                      <div class="product" id="is-vegetarian">
                          <span class="vegetarian"></span>
                      </div>
                      <div class="product" id="not-vegetarian">
                          <span class="something-else"></span>
                      </div>
                  </div>
              </div>
          </body>`);


        let products = [...dom.window.document.getElementsByClassName('category')]
            .map((category) => new Products(category));

        expect(products.length).to.equal(1);
        expect(products[0].all.length).to.equal(2);
        expect(products[0].atLeastOneVegetarianProduct).to.equal(true);
        expect(products[0].allVegetarianProducts).to.equal(false);
    });

    describe('should parse single product element into Product object', () => {

        it('without vegetarian class', () => {
            let dom = new JSDOM(`<!DOCTYPE html><head></head><body>
                <div class="product" id="is-vegetarian">
                  <span class="not-vegetarian"></span>
                </div>
            </body>`);


            let products = new Product(dom.window.document.getElementById('is-vegetarian'));

            expect(products.isVegetarian).to.equal(false);
        });

        it('without vegetarian class', () => {
            let dom = new JSDOM(`<!DOCTYPE html><head></head><body>
                <div class="product" id="is-vegetarian">
                  <span class="vegetarian"></span>
                </div>
            </body>`);


            let products = new Product(dom.window.document.getElementById('is-vegetarian'));

            expect(products.isVegetarian).to.equal(true);
        });

    });

});
