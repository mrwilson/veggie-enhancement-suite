import { Browser } from './browser';

function listenForClicks() {

    let browser = new Browser()

    browser.readAppState((state) => {
        let selection = document.getElementById(`vegetarian-${state.vegetarian}`);
        if (selection) {
            selection.checked = true;
        }
    });

    document.addEventListener("change", (e) => {
        if (e.target.classList.contains("vegetarian")) {
            browser.sendMessageToActiveTab({command: 'vegetarian', state: e.target.value})
            browser.pushAppState({ 'vegetarian': e.target.value });
        }
    });
}

listenForClicks();