import { readAppState, pushAppState, sendMessageToActiveTab } from './browser';

function listenForClicks() {
    readAppState((state) => {
        let selection = document.getElementById(`vegetarian-${state.vegetarian}`);
        if (selection) {
            selection.checked = true;
        }
    });

    document.addEventListener("change", (e) => {
        if (e.target.classList.contains("vegetarian")) {
            sendMessageToActiveTab({command: 'vegetarian', state: e.target.value})
            pushAppState({ 'vegetarian': e.target.value });
        }
    });
}

listenForClicks();