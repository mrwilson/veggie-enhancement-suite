import { JustEatAdapter } from './adapters/just-eat';
import { Browser } from './browser';

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  let browser = new Browser();

  let adapter = new JustEatAdapter(document);

  browser.readAppState(
    (state) => adapter.updateState(state.vegetarian),
    (state) => console.log(" JEES :: Unable to load state from local storage")
  );

  browser.onMessage((message) => {
    if (message.command === "vegetarian") {
      adapter.updateState(message.state);
    }
  });

})();