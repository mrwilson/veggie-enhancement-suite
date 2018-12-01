export class Browser {

    constructor() {
        this.stateName = 'jees_state';

        this.browser = (typeof chrome !== 'undefined')
            ? chrome
            : browser;
    }

    readAppState(callback) {
        this.browser.storage.local.get(this.stateName, (state) => {
            if (state && state[this.stateToWrite] && state[this.stateToWrite].vegetarian) {
                callback(state[this.stateToWrite]);
            }
        });
    }

    pushAppState(state) {
        let stateToWrite = {};
        stateToWrite[this.stateName] = state;

        this.browser.storage.local.set(stateToWrite);
    }

    sendMessageToActiveTab(message) {
        this.browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
            this.browser.tabs.sendMessage(tabs[0].id, message);
        });
    }

    onMessage(callback) {
      this.browser.runtime.onMessage.addListener(callback);
    }
}