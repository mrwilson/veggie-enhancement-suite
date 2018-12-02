import { Browser } from './browser';

function listenForClicks() {

    let browser = new Browser()

    function checkMostRecentSelection(state) {
        let selection = document.getElementById(`vegetarian-${state.vegetarian}`);
        if (selection) {
            selection.checked = true;
        }
    }

    browser.readAppState(
        checkMostRecentSelection,
        (state) => console.log("JEES :: Unable to load state from local storage")
    );

    document.addEventListener("change", (e) => {
        if (e.target.classList.contains("vegetarian")) {
            browser.sendMessageToActiveTab({command: 'vegetarian', state: e.target.value})
            browser.pushAppState({ 'vegetarian': e.target.value });
        }
    });
}

listenForClicks();