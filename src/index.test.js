import { sinon } from 'sinon';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import { hideNonVegetarian } from './index';

describe('Index', () => {
    describe('for vegetarians', () => {

        let dom = new JSDOM(`
            <!DOCTYPE html>
            <head></head>
            <body>
                <div class="container">

                    <div class="product" id="is-vegetarian">
                        <span class="vegetarian"></span>
                    </div>
                    <div class="product" id="not-vegetarian">
                        <span class="something-else"></span>
                    </div>
            </body>`);

        function getDisplayById(id) {
            return dom
                .window
                .document
                .getElementById(id)
                .style
                .display;
        }

        it('should hide non-vegetarian options', () => {
            hideNonVegetarian(dom.window.document);

            expect(getDisplayById('not-vegetarian')).to.equal('none');
        });

        it('should leave vegetarian options alone', () => {
            hideNonVegetarian(dom.window.document);

            expect(getDisplayById('is-vegetarian')).to.equal('');
        });
    });
});
