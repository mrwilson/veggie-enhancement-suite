import { setVegetarianState } from './index';
import { readAppState } from './browser';

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  readAppState((state) => setVegetarianState(state.vegetarian))

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "vegetarian") {
      setVegetarianState(message.state);
    }
  });

})();