export function readAppState(callback) {
    let browser = (typeof chrome !== 'undefined')
        ? chrome
        : browser;

    browser.storage.local.get('jees_state', (state) => {
        if (state && state.jees_state && state.jees_state.vegetarian) {
            callback(state.jees_state);
        }
    });
}

export function pushAppState(state) {
    let browser = (typeof chrome !== 'undefined')
        ? chrome
        : browser;

    browser.storage.local.set({'jees_state': state});
}

export function sendMessageToActiveTab(message) {
    let browser = (typeof chrome !== 'undefined')
        ? chrome
        : browser;

    browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        browser.tabs.sendMessage(tabs[0].id, message);
    });
}