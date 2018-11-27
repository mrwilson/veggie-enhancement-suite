let browser = (typeof chrome !== 'undefined')
    ? chrome
    : browser;

function listenForClicks() {
    document.addEventListener("change", (e) => {
        console.log(e);

        if (e.target.classList.contains("vegetarian")) {
            browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
                browser.tabs.sendMessage(tabs[0].id, {
                  command: 'vegetarian',
                  state: e.target.value
                });
            });
        }
    });
}

browser
    .tabs
    .executeScript({file: "background.js"}, listenForClicks);