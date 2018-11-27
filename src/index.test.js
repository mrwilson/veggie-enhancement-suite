import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { setVegetarianState } from './index';

 function newDom() {
    return new JSDOM(`
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
            <div class="category" id="no-options">
                <div class="products">
                    <div class="product">
                        <span class="something-else"></span>
                    </div>
                    <div class="product">
                        <span class="something-else"></span>
                    </div>
                </div>
            </div>
        </body>`);
}

function getDisplayById(dom, id) {
    return dom
        .window
        .document
        .getElementById(id)
        .style
        .display;
}

describe('Index', () => {
    describe('for vegetarians', () => {

        it('should hide non-vegetarian options', () => {
            let dom = newDom();
            
            setVegetarianState('only', dom.window.document);

            expect(getDisplayById(dom, 'not-vegetarian')).to.equal('none');
        });

        it('should leave vegetarian options alone', () => {
            let dom = newDom();
            
            setVegetarianState('only', dom.window.document);

            expect(getDisplayById(dom, 'is-vegetarian')).to.equal('');
        });

        it('should hide vegetarian options', () => {
            let dom = newDom();
            
            setVegetarianState('exclude', dom.window.document);

            expect(getDisplayById(dom, 'not-vegetarian')).to.equal('');
        });

        it('should leave non-vegetarian options alone', () => {
            let dom = newDom();
        
            setVegetarianState('exclude', dom.window.document);

            expect(getDisplayById(dom, 'is-vegetarian')).to.equal('none');
        });

        it('should ignore vegetarian options', () => {
            let dom = newDom();
        
            setVegetarianState('include', dom.window.document);

            expect(getDisplayById(dom, 'not-vegetarian')).to.equal('');
        });

        it('should ignore non-vegetarian options', () => {
            let dom = newDom();
        
            setVegetarianState('include', dom.window.document);

            expect(getDisplayById(dom, 'is-vegetarian')).to.equal('');
        });


        it('should not ignore all options if "only" then "exclude" selected', () => {
            let dom = newDom();

            setVegetarianState('only', dom.window.document);
            setVegetarianState('exclude', dom.window.document);

            expect(getDisplayById(dom, 'is-vegetarian')).to.equal('none');
            expect(getDisplayById(dom, 'not-vegetarian')).to.equal('');
        });

        it('should hide whole "products" section if no vegetarian options available', () => {
            let dom = newDom();

            setVegetarianState('only', dom.window.document);

            expect(getDisplayById(dom, 'no-options')).to.equal('none');
            expect(getDisplayById(dom, 'at-least-one-option')).to.equal('');
        });

        it('should not hide whole "products" section if at least one vegetarian option', () => {
            let dom = newDom();

            setVegetarianState('exclude', dom.window.document);

            expect(getDisplayById(dom, 'no-options')).to.equal('');
            expect(getDisplayById(dom, 'at-least-one-option')).to.equal('');
        });
    });
});
