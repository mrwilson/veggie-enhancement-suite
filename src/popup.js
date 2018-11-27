

function listenForClicks() {
    document.addEventListener("change", (e) => {
    let browser = (typeof chrome !== 'undefined')
        ? chrome
        : browser;

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

listenForClicks();