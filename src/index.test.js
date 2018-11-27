import { sinon } from 'sinon';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

import { setVegetarianState } from './index';

describe('Index', () => {
    describe('for vegetarians ', () => {

        function newDom() {
            return new JSDOM(`
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
        }

        function getDisplayById(dom, id) {
            return dom
                .window
                .document
                .getElementById(id)
                .style
                .display;
        }

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

        it('should leave vegetarian options alone', () => {
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

    });
});
