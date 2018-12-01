import { setVegetarianState } from './index';
import { Browser } from './browser';

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  let browser = new Browser();

  browser.readAppState((state) => setVegetarianState(state.vegetarian))

  browser.onMessage((message) => {
    if (message.command === "vegetarian") {
      setVegetarianState(message.state);
    }
  });

})();