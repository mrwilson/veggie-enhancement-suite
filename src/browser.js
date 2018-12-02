export class Browser {

    constructor(browser = (typeof chrome !== 'undefined') ? chrome : browser) {
        this.stateName = 'jees_state';
        this.browser = browser;
    }

    readAppState(callback, errorCallback) {
        this.browser.storage.local.get(this.stateName, (state) => {
            if (state && state[this.stateName] && state[this.stateName].vegetarian) {
                callback(state[this.stateName]);
            } else {
                errorCallback(state);
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