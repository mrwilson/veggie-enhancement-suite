import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import { Browser } from './browser';

describe('Browser', () => {
    describe('when reading app state', () => {

        function stubBrowser(stubState) {
            return {
                storage: {
                    local: {
                        get: function(key, callback) { callback(stubState); }
                    }
                }
            }
        }

        it('should execute callback', (done) => {
            let browser = new Browser(stubBrowser({ jees_state: { vegetarian: 'only' }}))
            
            browser.readAppState(
                (state) => { done(); },
                (state) => { done(new Error('should not have been called')); }
            );
        });

        it('should not execute callback if vegetarian state key does not exist', (done) => {
            let browser = new Browser(stubBrowser({ jees_state: { }}))

            browser.readAppState(
                (state) => { done(new Error('should not have been called')); },
                (state) => { done(); }
            );
        });

        it('should not execute callback if extension state key does not exist', (done) => {
            let browser = new Browser(stubBrowser({ }))

            browser.readAppState(
                (state) => { done(new Error('should not have been called')); },
                (state) => { done(); }
            );
        });

        it('should not execute callback if no state available from local storage', (done) => {
            let browser = new Browser(stubBrowser(undefined))

            browser.readAppState(
                (state) => { done(new Error('should not have been called')); },
                (state) => { done(); }
            );
        });
    });
});